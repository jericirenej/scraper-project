import React, { Component, Fragment } from 'react';
import Selector from './selectors';
import UrlInput from './urlInput';
import SiteMap from './classes/ScrapeList';


class App extends Component {
  state = {
      siteMaps: [
        new SiteMap(),
        new SiteMap()
      ]
  }
  

  AddSelector = (position, element) => {
    console.log(`Adding new selector AFTER Selector No. ${element+1}...`);
    let newState = this.state.siteMaps;
    newState[position].addSelector(element);
    this.setState({ siteMaps: newState });
  }

  DeleteSelector = (position, element) => {
    console.log(`Deleting selector No. ${element +1 }...`);
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
    //console.log(`Selector ${element+1} input: ${input.target.value}`);
    let newState = this.state.siteMaps;
    newState[position].updateSelectorValue(element, input);
    this.setState({ siteMaps: newState});
    
  }

  render() {
    console.log(this.state.siteMaps);
    const siteMaps = this.state.siteMaps;
    return (
      <Fragment>
      {siteMaps.map((item, itemIndex) => (
        <section key={item.id}>
          <UrlInput 
            urlValue = {siteMaps[itemIndex].url} nameValue = {siteMaps[itemIndex].name}
            urlProp = "url" nameProp = "name"
            onInputChange = {(input, identifier) => this.HandleUrlChange(input.target.value, itemIndex, identifier)}
          />
          <ul key= { item.id }>
          {item.selectors.map((selector, selectorIndex) => (
            <li key = {selector.id}>
            <Selector 
              onAdd={()=>this.AddSelector(itemIndex, selectorIndex)} 
              onDelete={() => this.DeleteSelector(itemIndex, selectorIndex)} 
              onInputChange = {(input) => this.HandleSelectorChange(input.target.value, itemIndex, selectorIndex)}
              index={selectorIndex}
              children={siteMaps[itemIndex].selectors.length}
              inputValue={selector.value}
              />
            </li>
            ))}
          </ul>
        </section>))}
      </Fragment>
      
      )
  }
}
 
export default App;

/* */