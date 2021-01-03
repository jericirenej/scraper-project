import { nanoid } from "nanoid";

export class Selector {
  constructor(id=nanoid()) {
    this.id = id;
    this.value= "";
    this.multiple= "";
    this.componentClass = "selector"
    this.type = "";
    this.childOf = [];
    this.parentOf = [];
    this.scrapeResult=[];
  }
  addParentStatus(childID) {
    this.parentOf.push(childID);
  }
  removeParentStatus(parentID) {
    this.parentOf = this.parentOf.filter(item => item !== parentID);
  }
  addChildStatus(parentID) {
    this.childOf.push(parentID);
  }
  removeChildStatus(childID) {
    this.childOf = this.childOf.filter(item => item !== childID);
  }
}

class SiteMap {
  constructor(id= nanoid(), name="") {  
    this.id= id;
    this.url= "";
    this.componentClass="sitemap";
    this.name = name;
    this.parentOf = [nanoid()]
    this.selectors= [this.addFirstSelector(this.parentOf[0], this.id)];
    }
    
    addFirstSelector (childID, parentID) {
      let selector = new Selector(childID);
      selector.childOf = parentID;
      return selector;
    }

  
  //Add a selector to the current SiteMap. 
  //HOW IT WORKS: You ADD A SIBLING selector by referencing the id of the PARENT (i.e. a sitemap or a parent selector id). You ADD A CHILD by referencing the id of the SELECTOR ITSELF.
  addSelector(parentID, index=0) {
    let state = this;
    let childID = nanoid();

    if (index >= state.selectors.length - 1 || state.selectors.length === 0) {
          state.selectors.push(new Selector(childID));
      } else {
        let newSelectors = [
          ...state.selectors.slice(0, index + 1),
          new Selector(childID),
          ...state.selectors.slice(index + 1)
        ];
        state.selectors = newSelectors;
      }
      
    //are added selectors children of siteMap or children of selectors? Act accordingly.
    let selectors = this.selectors;
    let childIndex, parentIndex;
    if (this.id === parentID) {
        this.parentOf.push(childID);
        childIndex = selectors.findIndex(item => item.id === childID);
        selectors[childIndex].addChildStatus(parentID);
    } else {
        childIndex = selectors.findIndex(item => item.id === childID);
        parentIndex = selectors.findIndex(item => item.id === parentID);
        console.log("Parent", selectors[parentIndex]);
        selectors[childIndex].addChildStatus(parentID);
        selectors[parentIndex].addParentStatus(childID);
    }
  }

  

  deleteSelector(id) {
    let reducedSelectors = this.selectors.filter(item => item.id !== id)
    this.selectors = reducedSelectors;
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

  //Return nested selector by id. Commented out because we will be parsing
  //the nested selector via the childOf property instead of actual nesting of arrays.
  /*checkChildren(arr, id, Action) {
    let isArray = Array.isArray(arr);
    if (isArray) {
      arr.map(item => {
        if (item.id === id) {
           return Action(item);
          } else {
            if (item.selectors.length) { this.checkChildren(item.selectors, id, Action)};
          }
        });
      } else {
        if (arr.id === id) {
            return Action(arr);
        } else {
          if (arr.selectors.length) { this.checkChildren(arr.selectors, id, Action) };
      }
    }
  }
  */

  //Add a child selector at a specified index. Disable, becuas ethe addSelector
  //function already achieves that.
/*
  addChildSelector(id) {
    let selectors = this.selectors;
    
    function AddChild (result) { 
      return result.selectors.push(new Selector());
    };

    this.checkChildren(selectors, id, AddChild);
    this.selectors = selectors;
  }
*/
  
}

export default SiteMap;