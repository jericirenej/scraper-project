import { SiteMap, AddSelector } from "./classes/ScrapeList.js";
import { nanoid } from "nanoid";

let siteMapID = nanoid();
let initialSiteMap = [
  new SiteMap(siteMapID, "Initial Map"),
]

AddSelector(initialSiteMap,siteMapID);

export { initialSiteMap };