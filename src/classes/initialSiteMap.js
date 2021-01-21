import { SiteMap, AddSelector } from "./ScrapeList.js";
import { nanoid } from "nanoid";

let initialArray = [];
initialArray.push(new SiteMap("InitialMap", "First Map"));
AddSelector(initialArray,"InitialMap",0,"First Selector");
console.log(initialArray);
