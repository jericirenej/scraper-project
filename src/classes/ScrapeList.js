import { nanoid } from "nanoid";

class SiteMap {
  constructor(id = nanoid(), name = "") {
    this.id = id;
    this.url = "";
    this.componentClass = "sitemap";
    this.name = name;
    this.parentOf = [];
  }

  updateSitemap(input, property) {
    let updatedSiteMap = this;
    updatedSiteMap[property] = input;
    this.SiteMap = updatedSiteMap;
  }
}

class Selector {
  constructor(parentID, id = nanoid()) {
    this.id = id;
    this.value = "";
    this.multiple = "";
    this.componentClass = "selector";
    this.type = "";
    this.memberOfSiteMap = "";
    this.childOf = [parentID];
    this.parentOf = [];
  }
  updateSelector(input, property) {
    let updatedSelector = this;
    updatedSelector[property] = input;
    this.Selector = updatedSelector;
  }
}

//------------------------
//------------------------

function AddSelector(state, parentID, index, childID = nanoid()) {
  if (state.find(item => item.id === childID)) {
    return console.log("Error: a child with this id already exists!");
  }
  let parent = state.filter(x => x.id === parentID)[0];
  if (!parent) {
    return console.log("Error: Parent does not exist!");
  }

  let newSelector = new Selector(parentID, childID);
  //if subIndex was undefined, assume that selector will be pushed to the
  //childOf list of the parent element.
  if (index === undefined) {
    index = parent.parentOf.length ? parent.parentOf.length - 1 : 0;
  }
  //Set position of child in parentOf.
  if (index === parent.parentOf.length - 1 || parent.parentOf.length === 0) {
    parent.parentOf.push(childID);
  } else {
    let newOrdering = [
      ...parent.parentOf.slice(0, index + 1),
      childID,
      ...parent.parentOf.slice(index + 1),
    ];
    parent.parentOf = newOrdering;
  }

  //Determine the siteMap id of which the selector is a member by tracing the parents
  //until an item with the componentClass === "sitemap" is found. This method presumers
  //that only one parent of a child can exist, even though the array type of the cildOf
  //property indicates the possibility of future implementation of shared parents.
  const findSiteMap = parent => {
    parent.componentClass === "sitemap"
      ? (newSelector.memberOfSiteMap = parent.id)
      : findSiteMap(state.filter(item => item.id === parent.childOf[0])[0]);
  };
  findSiteMap(parent);

  //Now, push the new selector to the state.
  state.push(newSelector);
  //If new selector is added, also update the parent.
  state.map(item => {
    if (item.id === parentID) {
      return (item = parent);
    }
  });
}

//Delete a selector, remove reference in parent, and remove  its descend
function DeleteItem(state, id) {
  let newState = [];
  let count = 1;
  //------------------------
  //Recursively remove children of a deleted selector.
  const RecursiveDelete = (arr, id) => {
    const target = arr.filter(item => item.id === id);

    //Filter out the selector
    newState = arr.filter(item => item.id !== id);

    //Find parent and remove reference on first iteration (in subsequent
    //iterations the parent is already removed at this point).
    if (count === 1) {
      let parent = arr.filter(item => item.parentOf.includes(id));
      if (parent.length) {
        parent = parent[0];
        let parentIndex = arr.findIndex(item => item.parentOf.includes(id));
        parent = parent.parentOf.filter(item => item !== id);
        newState[parentIndex].parentOf = parent;
      }
    }
    count++;

    //Extract child id's and run the Remove script for each of them.
    const children = target.map(item => item.parentOf).flat();
    if (children.length) {
      children.forEach(element => RecursiveDelete(newState, element));
    }
    return newState;
  };
  //------------------------
  return (state = RecursiveDelete(state, id));
}

function ClearSiteMap(arr, siteMapID) {
  //Filter out all the selectors, whose memberOfSiteMap property equals siteMapID.
  //Additionally, remove child entries in the siteMap node. This  function needs to be // invoked as an assignment operation (arr = ClearSiteMap(array, siteMapID)) .
  let newArray = arr.filter(item => item.memberOfSiteMap !== siteMapID);
  newArray[newArray.findIndex(item => item.id === siteMapID)].parentOf = [];
  return newArray;
}

export { SiteMap, Selector, AddSelector, DeleteItem, ClearSiteMap };
