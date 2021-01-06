import { nanoid } from "nanoid";

class Selector {
  constructor(parentID, id=nanoid()) {
    this.id = id;
    this.value= "";
    this.multiple= "";
    this.componentClass = "selector"
    this.type = "";
    this.memberOfSiteMap= "";
    this.childOf = [parentID];
    this.parentOf = [];
    this.scrapeResult=[];
  }
}


class SiteMap {
  constructor(id= nanoid(), name="") {  
    this.id= id;
    this.url= "";
    this.componentClass="sitemap";
    this.name = name;
    this.parentOf = [];
    }
  
  //Add a selector to the current SiteMap. 
  //HOW IT WORKS: You ADD A SIBLING selector by referencing the id of the PARENT (i.e. a sitemap or a parent selector id). You ADD A CHILD by referencing the id of the SELECTOR ITSELF.
  
    updateSitemap(input, property) {
      let updatedSiteMap = this;
      updatedSiteMap[property] = input;
      this.SiteMap = updatedSiteMap;
  }

}

function AddSelector(state, parentID, childID = nanoid(), index) {
  if (state.find(item => item.id === childID)) {
    return console.log("Error: a child with this id already exists!");
  }
  let parent = state.filter(x => x.id === parentID)[0];
  if (!parent) {
    return console.log("Error: Parent does not exist!");
  }
  
  let newSelector = new Selector(parentID, childID) 
  //if subIndex was undefined, assume that selector will be pushed to the
  //childOf list of the parent element.
  if (index === undefined) { 
    index = parent.parentOf.length ? (parent.parentOf.length - 1) : 0;
  }
  //Set position of child in parentOf.
  if (index === parent.parentOf.length  || parent.parentOf.length === 0) {
    parent.parentOf.push(childID);
  } else {
    let newOrdering = [
      ...parent.parentOf.slice(0, index + 1), 
      childID, 
      ...parent.parentOf.slice(index + 1)];
    parent.parentOf = newOrdering;
  }

  //Determine the siteMap id of which the selector is a member by tracing the parents
  //until an item with the componentClass === "sitemap" is found. This method presumers
  //that only one parent of a child can exist, even though the array type of the cildOf 
  //property indicates the possibility of future implementation of shared parents.
  const findSiteMap = parent => { parent.componentClass === "sitemap" 
    ? newSelector.memberOfSiteMap = parent.id 
    : findSiteMap(state.filter(item => item.id ===parent.childOf[0])[0]) 
  }
  findSiteMap(parent);

  //Now, push the new selector to the state.
  state.push(newSelector);
  //If new selector is added, also update the parent.
  state.map(item => { 
    if(item.id === parentID) { item = parent};
  })  
}

function DeleteSelector(state, id) {
  //Delete selector and all of its childre. Also, remove its entry from the parent.
  //Initializa a new parent variable with removed reference.
  let parentItem = state.filter(item => item.parentOf.includes(id))[0];
  let newParentOf = parentItem.parentOf.filter(item => item !== id);
  parentItem.parentOf = newParentOf;

  //Remove selector.
  state = state.filter(item => item.id !== id);
  //Update parent in state
  state = state.map(item => item.id === parentItem.id ? item = parentItem : item);
  
  //Remove children.
  for (let element of state) {
    if (element.hasOwnProperty("childOf")) {
      if (element.childOf.includes(id)) {
        state = state.filter(item => item.id !== element.id);
      }
    }
  }
  //Lastly, set state to equal the updated state.
  return state;
  
}


function ClearSiteMap(arr, siteMapID) {
  //Filter out all the selectors, whose memberOfSiteMap property equals siteMapID.
  //Additionally, remove child entries in the siteMap node. 
  //In contrast to other functions, this one  RETURNS a new state array and does NOT MODIFY
  //THE ORIGINAL ARRAY DIRECTLY! Therefore, you need too call this function as an assignment 
  // operation (i.e. array = ClearSiteMap(array, siteMapID))!!
  let newArray = arr.filter(item => item.memberOfSiteMap !== siteMapID);
  newArray[newArray.findIndex(item => item.id === siteMapID)].parentOf = [];
  return newArray;
}
 

export { SiteMap, Selector, AddSelector, DeleteSelector, ClearSiteMap };