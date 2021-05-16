const sitemapClass = "sitemap";

const generateQueryTemplate = sitemapArray => {
  let outputObj = {};
  const validQueryType = "text";

  const { sitemap, selectors } = sitemapArray;
  const children = selectors.filter(selector => sitemap.parentOf.includes(selector.id));

  const recursiveQueriesExtraction = (children, selectors, template) => {
    if (children.length) {
      children.forEach(child => {
        return child.type === validQueryType ? template[child.name] = "" : null;
      });
    }
    const descendants = children.map(child => (child.parentOf.length > 0 && child.parentOf)).flat();
    if (descendants.length) {
      const grandchildren = selectors.filter(selector => descendants.includes(selector.id));
      return recursiveQueriesExtraction(grandchildren, selectors, template);
    }
  };
  recursiveQueriesExtraction(children, selectors, outputObj);
  return outputObj;
};




const arrangeSiteMaps = queryObject => {
  const siteMaps = queryObject.filter(entry => entry.componentClass === sitemapClass);
  const selectors = queryObject.filter(entry => entry.componentClass !== sitemapClass);
  return siteMaps.map(sitemap => {
    return {
      sitemap,
      selectors: selectors.filter(selector => selector.memberOfSiteMap === sitemap.id),
    };
  });
};

const cleanText = text => {
  const trim = /(\s{2,})/gm;
  const noBreaks = /\r?\n|\r/gm;
  return text.replace(noBreaks, "").replace(/\\n/gm, "").replace(trim, "").replace(null, "");
}

const selectorClasses = new Map([["link", "href"],["text", "textContent"], ["click", "click"]])


export { arrangeSiteMaps, generateQueryTemplate, cleanText, selectorClasses };
