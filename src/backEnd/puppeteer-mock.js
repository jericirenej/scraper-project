import {
  arrangeSiteMaps,
  generateQueryTemplate,
  cleanText,
  selectorClasses,
} from "./parseClasses.js";
import puppeteer from "puppeteer";
//Import testing arrays.
import { tempMaps, amazonMap } from "./tmpClasses.js";

//Scrape a single level of selectors
const singleScrape = async (page, queries, sitemap, url, clickers) => {  
  try {
    let destinations;
    let clickElements;
    //Set clickers elemetn to [null] if the parameter is null, so that the
    //we can always evaluate it in the scraping operation.
    clickers ? (clickElements = clickers.slice(0,7)) : (clickElements = [null]);
    let textQueries = false;
    Array.isArray(url)
      ? (destinations = url.map(eachUrl => new URL(eachUrl)))
      : (destinations = [new URL(url)]);

    let requestedData = { queries: [], links: [], clicks: [] };

    //Cycle through all url addresses in one browser session.
    for (let urlAddress of destinations) {
      const url = urlAddress.origin + urlAddress.pathname;
      console.log(urlAddress);
      await page.goto(urlAddress, { waitUntil: "domcontentloaded" });
    
      //Handle all click events, prior to fetching query data
      for (let click of clickElements) {
        try {
          await handleClick(click, page);
        } catch (error) {
          console.log("An error ocurred: ", error.name)
          continue;
        }

        let tempData = generateQueryTemplate(sitemap);
        // For each url, cycle through all queries
        for (let query of queries) {
          const selectorType = selectorClasses.get(query.type.toLowerCase());
          //If query is a click selector, store the necessary data, then continue
          if (selectorType === "click") {
            let clickObj = await clickInfo(query, page);
            requestedData.clicks.push(clickObj);
            continue;
          }

          let target = "link";
          if (selectorType === "textContent") {
            target = query.name;
            textQueries = true;
          }

          //Perform single or multiple selector request, depending on the type of selector
          tempData[target] = await extractSelectorContent(query, selectorType, page);
          
          //Push links and queries to their respective property array
          if (selectorType === "href") {
            tempData.parentOf = query.parentOf;
            tempData.id = query.id;
            requestedData.links.push(tempData);
          }
        }

        if (textQueries) {
          for (let key of Object.keys(tempData)) {
            if (tempData[key]) {
              tempData[key] = cleanText(tempData[key]);
            }
          }
          requestedData.queries.push(tempData);
          //console.log(requestedData.queries);
          requestedData.queries.flat();
          console.log(requestedData.queries);
        }
        
        await page.goto(url, { waitUntil: "domcontentloaded" });
      }
    }
    return requestedData;
  } catch (error) {
    console.log(`OoOops... 
    ${error.name}: ${error.message}`);
    return error;
  }
};

//Perform click action on selector.
//IMPORTANT - clicks presuppose elements with id property!
const handleClick = async (clickSelector, page) => {
  if (clickSelector === null) {
    return;
  }
  return await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 8000 }),
    page.click(`#${clickSelector}`),
  ]);
};

//Get the required information on a click element, then
//pass it on.
const clickInfo = async (query, page) => {
  let returnObj = {};
  returnObj.click = await page.evaluate(
    (query) => {
      let clicks;
      if (query.multiple === "true") {
        clicks = document.querySelectorAll(query.value);
        return clicks[0]
          ? (clicks = Array.from(clicks).map(click => click.id))
          : (clicks = [null]);
      } else {
        return (clicks = document.querySelector(query.value));
      }
    },
    query,
  );
  returnObj.name = query.name;
  returnObj.multiple = query.multiple;
  returnObj.id = query.id;
  returnObj.parentOf = query.parentOf;
  return returnObj;
};

//Extract text content or href.
const extractSelectorContent = async (query, selectorType, page) => {
  return await page.evaluate(
    (query, selectorType) => {
      if (query.multiple === "true") {
        let result = document.querySelectorAll(query.value);
        result[0]
          ? (result = Array.from(result).map(selector =>
              selector[selectorType] ? selector[selectorType] : null
            ))
          : (result = null);
        return result
          ? selectorType === "textContent"
            ? result.join(";")
            : result
          : null;
      } else {
        let result = document.querySelector(query.value);
        return result ? result[selectorType] : null;
      }
    },
    query,
    selectorType
  );
};

// Recursively perform scraping for a single sitemap for all selector leves.
const singleSiteMap = async sitemap => {
  let results = [];
  //Define the parameters for the first scrape (sitemap first level selectors and the
  //sitema urls').
  const { url: sitemapURL, parentOf: childrenIDs } = sitemap.sitemap;
  const directChildren = sitemap.selectors.filter(selector =>
    childrenIDs.includes(selector.id)
  );

  //Define the recursive scraping function.
  const recursiveScrape = async (page, children, sitemapArr, urls, clickers) => {
    let requestedData = {};

    requestedData = await singleScrape(page, children, sitemapArr, urls, clickers);
    console.log(JSON.stringify(requestedData,undefined,2));
    const { queries, links, clicks } = requestedData;
    if (queries.length) {
      results.push(queries);
    }

    //If the returned object has any links, then there are
    //child selectors that need to be processed for each link.
    if (links.length) {
      let children = links
        .map(linkObj =>
          sitemapArr.selectors.filter(selector =>
            linkObj.parentOf.includes(selector.id)
          )
        )
        .flat();
      let urls = links.map(linkObj => linkObj.link).flat();
      await recursiveScrape(page, children, sitemapArr, urls);
    }
    if (clicks.length) {
      let children = clicks
        .map(clickObj =>
          sitemapArr.selectors.filter(selector =>
            clickObj.parentOf.includes(selector.id)
          )
        )
        .flat();
      let allClicks = clicks.map(clickObj => clickObj.click).flat();
      await recursiveScrape(page, children, sitemapArr, urls, allClicks);
    }
  };

  //Run Puppetter instance and the scraping operation.
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  try {
    await recursiveScrape(page, directChildren, sitemap, sitemapURL);
    await browser.close();
    return results.flat();
  } catch (error) {
    await browser.close()
    console.log(`OoOops... 
    ${error.name}: ${error.message}`);
  }

};

//NOT YET COMPLETED
/*const scrapeSiteMaps = async sitemapsArray => {
  let results = [];
  for (let sitemap of sitemapsArray) {
    const {
      url: sitemapUrl,
      id: sitemapId,
      parentOf: sitemapChildren,
    } = sitemap.sitemap;
    const tempResults = await singleScrape(sitemapChildren, sitemapUrl);
    let links = tempResults.links;
    results.push(tempResults.queries);
    if (links.length) {
      links.forEach(link);
    }
  }
};*/

//Functionality testing
const sitemapArray = arrangeSiteMaps(tempMaps);

singleSiteMap(sitemapArray[0]).then(data =>
  console.log(JSON.stringify(data, undefined, 2))
);
