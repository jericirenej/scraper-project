# CDN - Compact Desktop Scraper

## What's it About
The aim of this project is to build a desktop scraping application based on React that would allow for relatively straightforward scraping of websites on the basis of specified sitemaps with nested selectors, all of which is displayed graphically to the user. 

The motivation for the project arose from frequent use of different scraping tools and occassional use of *Puppeteer* to fetch results from different websites. Building my own scraper seemd like a big and fun challenge to undertake as a learning developer.

----
The User Interface is *React* based, while *Puppeteer* will perform the  actual scraping work based on the sitemap configuration provided by the user.

As of now, the application *is not designed to be responsive* -- it is meant to be used on a desktop screen that can accomodate all the necessary information. Responsive design implementation will optionally be impemented once the basic functionality is ensured.

## Current State
*The basic user interface is operational*. This means that the user can: 
- add or remove sitemaps
- add hierarchically ordered selectors and recursively remove them
- choose their type and whether or not they are multiple in nature (i.e. if all of the occurrences should be considered)

Sitemap configurations are stored in the application state for now.

Also, *the basic back-end scraping functionality has been implemented*. This means that Puppeteer is able to parse the stored sitemaps and recursively scrape the results. Puppeteer scripts haven't been uploaded yet, as the solution is not stable enough yet, and the Express middleware has not yet been implemented.


## The Big Tests Ahead
### Back-end Implementation of Scraping Operations 
Compelted on a basic level. Need to extend functionality to encompass different selector types (especially click type links).

### Persistent Storage and Results Output
Connected with the need to develop the appropriate back-end, the question of persistent storage of saved sitemap configuration and / or scraping results also comes into play. For now, the possibility of using local storage options will be considerd. After the app will reach the desired functionality, further extensions can be planned.

It is paramount that users can export the results of the queries. JSON exporting will be provided. Also, optionally, users should be able to see a preview of the results in a tabular format.


**In short:** 
- **Back-end logic must be ~~developed~~ completed**
- **Express server should be set-up to pass the sitemaps to the back-end Puppeteer script**
- **Optional: Electron deployment**


The preview of the current state can be seen [here](https://jericirenej.github.io/scraper-project/).

<br><br>