import { nanoid } from "nanoid";

class Selector {
  constructor(id=nanoid(), parentID) {
    this.id = id;
    this.value= "";
    this.multiple= "";
    this.componentClass = "selector"
    this.type = "";
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
    
    firstSelAdd (childID, parentID) {
      let selector = new Selector(childID, 0);
      selector.childOf = parentID;
      this.parentOf.push(childID);
      selector.subIndex = 0;
      return selector
    }

    firstLvlSelAdd (childID, parentID) {
      let selector = new Selector(childID);
      selector.childOf = parentID;
      this.parentOf.push(childID);
      return this.selectors.push(selector);
    }

  
  //Add a selector to the current SiteMap. 
  //HOW IT WORKS: You ADD A SIBLING selector by referencing the id of the PARENT (i.e. a sitemap or a parent selector id). You ADD A CHILD by referencing the id of the SELECTOR ITSELF.
  addSelector(parentID, index) {
    let state = this;
    let childID = nanoid();

    if (index >= state.selectors.length - 1 || state.selectors.length === 0 || index === undefined) {
          state.selectors.push(new Selector(childID));
      } else {
        let newSelectors = [
          ...state.selectors.slice(0, index + 1),
          new Selector(childID),
          ...state.selectors.slice(index + 1)
        ];
        state.selectors = newSelectors;
      }
      
    //Are selectors children of the siteMap or children of selectors? Update parent and chld relationships accordingly.
    let selectors = this.selectors;
    let childIndex, parentIndex;
    if (this.id === parentID) {
        this.parentOf.push(childID);
        childIndex = selectors.findIndex(item => item.id === childID);
        selectors[childIndex].addChildStatus(parentID);
    } else {
        childIndex = selectors.findIndex(item => item.id === childID);
        parentIndex = selectors.findIndex(item => item.id === parentID);
        selectors[childIndex].addChildStatus(parentID);
        selectors[parentIndex].addParentStatus(childID);
    }
  }

  deleteSelector(id) {
    function recursiveDelete(id, selectors) {
      let children = [];
      let target = selectors.filter(x => x.id === id)[0];
      if (target.parentOf.length) {
        for (let item of target.parentOf) {
          children.push(selectors.filter(y => y.id === item))
          children = children.flat();
        }  
      };
      firstLvlSel = firstLvlSel.filter(x => x !== id);
      console.log(`Deleting selector with id: "${id}...`);
      baseSelectors = baseSelectors.filter(x => x.id !== id);
      for (let element of baseSelectors) {
          if (element.parentOf.includes(id)) { 
          element.parentOf = element.parentOf.filter(item => item !== id);
        }
      }
      if (children.length) {
        children.map(child => recursiveDelete(child.id, baseSelectors))
      }
    }

    let baseSelectors = this.selectors;
    //Declare firstLvlSel for cleaning up the parentOf in SiteMap.
    let firstLvlSel = this.parentOf;
    recursiveDelete(id, baseSelectors);
    this.selectors = baseSelectors;
    this.parentOf = firstLvlSel;
  }

  deleteSelectorsAll(id) {
    let selectors = this.selectors;

    function Delete (result) {
      return result.selectors = [];
    };

    this.checkChildren(selectors, id, Delete);
    this.selectors = selectors;
  }

  updateSelectorValue(id, input) {
    let updatedSelector = this.selectors;
    function ModifySelector(result) {
      result.value = input;
    }
    this.checkChildren(updatedSelector, id, ModifySelector)
    this.selectors = updatedSelector;
  }

  updateSitemap(input, property) {
    let updatedSiteMap = this;
    updatedSiteMap[property] = input;
    this.SiteMap = updatedSiteMap;
  }

}

function DeleteSelector(state, id) {
  //Delete selector and all of its childre. Also, remove its entry 
  //from the parent.
  //Remove reference in parent
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

function AddSelector(state, parentID, childID = nanoid(), index) {
  if (state.find(item => item.id === childID)) {
    return console.log("Error: a child with this id already exists!");
  }
  let parent = state.filter(x => x.id === parentID)[0];
  if (!parent) {
    return console.log("Error: Parent does not exist!");
  }
  
  let newSelector = new Selector(childID, parentID, index) 
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
  console.log("New ordering", newOrdering);
  parent.parentOf = newOrdering;
}
  //Push new selector to the state.
  state.push(newSelector);
  //If new selector is added, also update the parent.
  state.map(item => { 
    if(item.id === parentID) { item = parent};
  })  
}

 

export { SiteMap, Selector, AddSelector, DeleteSelector };