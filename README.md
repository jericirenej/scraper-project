# CDN - Compact Desktop Scraper

## What's it About
The aim of this project is to build a desktop scraping application based on React that would allow for relatively straightforward scraping of websites on the basis of specified sitemaps with nested selectors, all of which is displayed graphically to the user. 

The motivation for the project arose from frequent use of different scraping tools and occassional use of *Puppeteer* to fetch results from different websites. Building my own scraper seemd like a big and fun challenge to undertake as a learning developer.

----
The User Interface is *React* based, while *Puppeteer* is planned to do the actual scraping work based on the sitemap configuration provided by the user.

The application is not meant to be responsive -- it is meant to be used on a desktop screen that can accomodate all the necessary information.

## Current State
*The basic user interface is operational*. This means that the user can: 
- add or remove sitemaps
- add hierarchically ordered selectors and recursively remove them
- choose their type and whether or not they are multiple in nature (i.e. if all of the occurrences should be considered)

Sitemap configurations are stored in the application state, which means that they are ready to be used for the eventual scraping part of the application. However, stroage is not yet persistent. Back-end is not implemented.


## The Big Tests Ahead
### Back-end Implementation of Scraping Operations
Due to security measures of websites that generally disallow cross-origin network requests, it simply *isn't possible to actually implement the scraping inside the browser*. 

Put simply: In the vast majority of cases, ordinary fetch requests for content to external sites will fail.

A possible way to solve this issue and get around the security restrictions would be to build a browser extension which would have a wider set of security permission than a normal site running inside a browser tab. However, this is not currently under consideration.

Instead, the main focus is on implementing the scraping functionality by using *Node.js* and the associated *Puppeteer* package. This, however, brings the additional demand of developing a complete application that fuses together the front-end and the the-yet-to-be-developed back-end portions.

### Persistent Storage and Results Output
Connected with the need to develop the appropriate back-end, the question of persistent storage of saved sitemap configuration and / or scraping results also comes into play. 

The possibilities of implementing persistent storage via browser-available methods ( such  as localStorage or IndexedDB), local storage (if the app will be developed using Electron), and online storage solutions should be considered. Online storage solutions bring with them the question of proper user authentication. 

Users should also be able to export the results of their queries or store them.


**In short:** 
- **Back-end logic must be developed for scraping the sitemaps configurations provided for in the front-end.**
- **Decision on the type of deployment must be made (Electron or cloud deployment).**


## To Do
- THE UI SECTION: 
  - Complete the basic functionality by adding sections for viewing already saved configurations (simulate back-end development with mock-ups), exporting the results and running the queries. 
- BACK-END IMPLEMENTATION:
  - Generate logic for use with the provided sitemap parameters.
  - Middleware for connecting React and back-end
  - Decide on deployment type. 

<br><br>

Here's hoping that I make it ;)
  
  



