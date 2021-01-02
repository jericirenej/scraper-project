import React, { Component } from 'react';
import Selector from './selectors';
import UrlInput from './urlInput';
import SiteMap from './classes/ScrapeList.js';
import { BiListPlus } from "react-icons/bi";
import "./style.css";


class App extends Component {
  state = {
      siteMaps: [
        new SiteMap()
      ]
  }

  AddSelector = (id, position, index) => {
    let newState = this.state.siteMaps;
    newState[position].addSelector(id, index);
    this.setState({ siteMaps: newState });
  }

  AddChild = (position, id) => {
    let newState = this.state.siteMaps;
    newState[position].addChildSelector(id);
    this.setState({ siteMaps: newState});
    console.log(this.state.siteMaps[position].selectors);

  }

  DeleteSelector = (position, element) => {
    let newState = this.state.siteMaps;
    newState[position].deleteSelector(element);
    this.setState({ siteMaps: newState });
  }

  HandleUrlChange(input, position, identifier) {
    let newState = this.state.siteMaps;
    newState[position].updateSitemap(input, identifier);
    this.setState({ siteMaps: newState });
  }

  HandleSelectorChange = (input, position, element) =>  {
    let newState = this.state.siteMaps;
    newState[position].updateSelectorValue(element, input);
    this.setState({ siteMaps: newState});
    
  }

  AddSiteMap = position => {
    let newState = this.state.siteMaps
    if (position) {
      newState = newState.slice(0,position+1).concat(new SiteMap()).concat(newState.slice(position+1));
    } else {
      newState = newState.concat(new SiteMap());
    };
    this.setState( { siteMaps: newState });
  }

  DeleteSiteMap = id => {
    let newState = this.state.siteMaps;
    newState = newState.filter(item => item.id !== id);
    this.setState({ siteMaps: newState });
  }

  render() {
    const siteMaps = this.state.siteMaps;
    return (
      <div className="list-container">
      {siteMaps.map((item, itemIndex) => (
        <section key={item.id}>
          <UrlInput 
            urlValue = {siteMaps[itemIndex].url} nameValue = {siteMaps[itemIndex].name}
            urlProp = "url" nameProp = "name"
            onInputChange = {(input, identifier) => this.HandleUrlChange(input.target.value, itemIndex, identifier)}
            onSiteDelete={() => this.DeleteSiteMap(item.id)}
            siteMaps = {siteMaps.length}
          />
          <ul key= { item.id }>

            
          {item.selectors.map((selector, selectorIndex) => (
            <li key = {selector.id}>
            <Selector 
              onAdd={()=>this.AddSelector(item.id, itemIndex, selectorIndex)} 
              onAddChild={() => this.AddChild(itemIndex, selector.id)}
              onDelete={() => this.DeleteSelector(itemIndex, selector.id)} 
              onInputChange = {(input) => this.HandleSelectorChange(input.target.value, itemIndex, selector.id)}
              index={selectorIndex}
              children={siteMaps[itemIndex].selectors.length}
              visible={siteMaps[itemIndex].selectors[selectorIndex].visible}
              inputValue={selector.value}
              />
            </li>
            ))}
          </ul>
        </section>))
        }
        <BiListPlus 
          className="addNewList button"
          title="Add another scraping list"
          onClick = {() => this.AddSiteMap()} />
      </div>
    )}
}
 
export default App;

/* */