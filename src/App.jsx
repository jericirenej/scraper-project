import React, { Component, Fragment } from 'react';
import Selector from './selectors';
import SiteMap from './classes/ScrapeList';


class App extends Component {
  state = {
      siteMaps: [
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

  HandleChange = (input, position, element) =>  {
    //console.log(`Selector ${element+1} input: ${input.target.value}`);
    let newState = this.state.siteMaps;
    newState[position].updateSelectorValue(element, input);
    this.setState({ siteMaps: newState});
    
  }

  render() {
    
    return (
      <Fragment>
      {this.state.siteMaps.map(item => (
        <ul key={item.id}>
          {item.selectors.map(selector => (
            <li key = {selector.id}>
            <Selector 
              onAdd={()=>this.AddSelector(item.id, selector.id)} 
              onDelete={() => this.DeleteSelector(item.id, selector.id)} 
              onInputChange = {(input) => this.HandleChange(input.target.value, item.id, selector.id)}
              index={selector.id}
              children={this.state.siteMaps[item.id].selectors.length}
              inputValue={selector.value}
              />
            </li>
          ))}
        </ul>))}
      </Fragment>
      
      )
  }
}
 
export default App;

/* */