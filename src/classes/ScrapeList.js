import { nanoid } from "nanoid";

class Selector {
  constructor(id = nanoid(), level=0) {
    this.id = id;
    this.level = level;
    this.value= "";
    this.multiple= "";
    this.type = "";
  }
}

class SiteMap {
  constructor(id= nanoid(), name="") {  
    this.id= id;
    this.url= "";
    this.name = name;
    this.selectors= [new Selector()];
  }

  //Add a selector to the current SiteMap. IF: the selector is added at the end;
  //or the array only has 1 element; or parameter is omitted, THEN use push(); 
  //ELSE insert selector AFTER the specified index.
  addSelector(index) {
    let selectors = this.selectors;
    if (!index || index >= selectors.length - 1 || selectors.length === 0) {
          selectors.push(new Selector(selectors.length));
    } else {
      let newSelectors = [
        ...selectors.slice(0, index + 1),
        new Selector(index + 1),
        ...selectors.slice(index + 1).map(item => ({...item, id: item.id + 1 }))
      ];
      this.selectors = newSelectors;
    }
  }

  deleteSelector(index) {
    let reducedSelectors = this.selectors.filter(item => item.id !== index)
    reducedSelectors = reducedSelectors.map(item => (
      {...item, id: reducedSelectors.indexOf(item)}
    ));
    this.selectors = reducedSelectors;
  }

  updateSelectorValue(index, input) {
    let updatedSelector = this.selectors[index];
    updatedSelector.value = input;
    this.selectors[index] = updatedSelector;
  }

  updateSitemap(input, property) {
    let updatedSiteMap = this;
    updatedSiteMap[property] = input;
    this.SiteMap = updatedSiteMap;
  }

  //Add a child selector at a specified index
  addChildSelector(index) {
    let selectors = this.selectors[index];
    selectors = [{...selectors, level: selectors.level++}, [new Selector()]];
    this.selectors[index] = selectors;
  }
}

export default SiteMap;