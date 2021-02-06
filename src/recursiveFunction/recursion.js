import {
  SiteMap,
  AddSelector,
  DeleteItem,
  ClearSiteMap,
  Selector,
} from "../classes/ScrapeList.js";
import { nanoid } from "nanoid";

let parentID = "SiteMap";
let secondParentID = "Second SiteMap";
let firstChild = "First Child";
let secondChildID = "Second Child";
let secondChildGradnChildID = "Second-first GrandChild";
let thirdChildID = "Third Child";
let firstGrandChild = "First GrandChild";
let secondGrandChild = "Second GrandChild";
let firstGrandGrand = "1. Grand-grand-child";
let secondGrandGrand = "2. Grand-grand-child";
let arr = [
  new SiteMap(parentID, "SiteMap List"),
  new SiteMap(secondParentID, "Second SiteMap List"),
];
AddSelector(arr, secondParentID, "Second SiteMap Child");
AddSelector(arr, parentID, 0, firstChild);
AddSelector(arr, parentID, 0, secondChildID);
AddSelector(arr, secondChildID, 0, secondChildGradnChildID);
AddSelector(arr, parentID, 0, thirdChildID);

AddSelector(arr, firstChild, 0, firstGrandChild);

AddSelector(arr, firstChild, 0, secondGrandChild);
AddSelector(arr, firstGrandChild, 0, firstGrandGrand);
AddSelector(arr, firstGrandChild, 0, secondGrandGrand);
//arr = DeleteSelector(arr, firstChild);
//console.log("Logging arr ...", JSON.stringify(arr, undefined, 3)); //console.log(JSON.stringify(arr, undefined, 3));

const siteLists = arr.filter((item) => item.componentClass === "sitemap");
const selectors = arr.filter((item) => item.componentClass === "selector");

console.log(JSON.stringify(arr, undefined, 2));

let index = arr.findIndex((item) => item.id === "First Child");

console.log("Now, let's delete the first sitemap...");
arr = DeleteItem(arr, parentID);

console.log(JSON.stringify(arr, undefined, 3));
