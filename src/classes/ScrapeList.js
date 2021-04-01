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
    this[property] = input;
  }
}

class Selector {
  constructor(parentID, id = nanoid()) {
    this.id = id;
    this.name = "";
    this.value = "";
    this.multiple = "";
    this.componentClass = "selector";
    this.type = "";
    this.memberOfSiteMap = "";
    this.childOf = [parentID];
    this.parentOf = [];
  }
  updateSelector(input, property) {
    this[property] = input;
  }
}

//METHODS

function addSelector(state, parentID, index, childID = nanoid()) {
  if (state.find(stateSelector => stateSelector.id === childID)) {
    return console.error("Error: a child with this id already exists!");
  }
  let parent = state.filter(stateSelector => stateSelector.id === parentID);
  if (!parent.length) {
    return console.error("Error: Parent does not exist!");
  }
  parent = parent[0];

  let newSelector = new Selector(parentID, childID);
  //if element index was undefined, thepush the selector to the childOf list of the parent.
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

  //Determine the siteMap id of which the selector is a member by tracing the parents.
  //Only one parent per child allowed.
  const findSiteMap = parent => {
    parent.componentClass === "sitemap"
      ? (newSelector.memberOfSiteMap = parent.id)
      : findSiteMap(state.filter(item => item.id === parent.childOf[0])[0]);
  };
  findSiteMap(parent);

  //Now, push the new selector to the state.
  state.push(newSelector);
  //If new selector is added, also update the parent.
  state.forEach(item => {
    if (item.id === parentID) {
      return (item = parent);
    }
  });
}

//Delete a selector, remove reference in parent, and remove  its descend
function deleteItem(state, id) {
  let newState = [];
  let count = 1;
  
  //Recursively remove children of a deleted selector.
  const RecursiveDelete = (arr, id) => {
    const target = arr.filter(item => item.id === id);
    //Filter out the selector
    newState = arr.filter(item => item.id !== id);
    //Find parent and remove reference on first iteration.
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

  return state = RecursiveDelete(state, id);
}

function clearSiteMap(arr, siteMapID) {
  //Filter out all the selectors, whose memberOfSiteMap property equals siteMapID.
  //Also remove child entries in the siteMap node.
  let newArray = arr.filter(item => item.memberOfSiteMap !== siteMapID);
  newArray[newArray.findIndex(item => item.id === siteMapID)].parentOf = [];
  return newArray;
}

export { SiteMap, Selector, addSelector, deleteItem, clearSiteMap };