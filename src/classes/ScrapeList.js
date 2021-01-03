import { nanoid } from "nanoid";

export class Selector {
  constructor(id = nanoid()) {
    this.id = id;
    this.value= "";
    this.multiple= "";
    this.componentClass = "selector"
    this.type = "";
    this.scrapeResult=[];
    this.selectors = [];
  }
}

class SiteMap {
  constructor(id= nanoid(), name="") {  
    this.id= id;
    this.url= "";
    this.componentClass="sitemap";
    this.name = name;
    this.selectors= [new Selector()];
  }

  
  
  //Return nested selector by id
  checkChildren(arr, id, Action) {
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
    
  //Add a selector to the current SiteMap. 
  //HOW IT WORKS: You ADD A SIBLING selector by referencing the id of the PARENT (i.e. a sitemap or a parent selector id). You ADD A CHILD by referencing the id of the SELECTOR ITSELF.
  addSelector(id, index=0) {
    let state = this;

    function SelectorAdd(result) {
      if (index >= result.selectors.length - 1 || result.selectors.length === 0) {
          return result.selectors.push(new Selector());
      } else {
        let newSelectors = [
          ...result.selectors.slice(0, index + 1),
          new Selector(),
          ...result.selectors.slice(index + 1)
        ];
        return result.selectors = newSelectors;
        }
      }
      this.checkChildren(state, id, SelectorAdd);
      this.selectors = state.selectors;
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