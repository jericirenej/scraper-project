import React, { Component } from "react";
import { initialSiteMap } from "./initialSiteMap.js";
import SingleSrapeList from "./components/singleList.jsx";
import {
  SiteMap,
  AddSelector,
  DeleteItem,
  ClearSiteMap,
} from "./classes/ScrapeList.js";
import { BiListPlus } from "react-icons/bi";
import "./style.css";

class App extends Component {
  state = {
    siteMaps: [initialSiteMap],
  };

  getValue = (id) => {
    let state = this.state.SiteMaps;
    let index = state.findIndex(item => item.id === id);
    let value = state[index].value;
    return value;
  }

  addSelector = (targetID, index) => {
    let newState = this.state.siteMaps;
    AddSelector(targetID, index);
    this.setState({ siteMaps: newState });
  };

  DeleteSelector = (position, element) => {
    let newState = this.state.siteMaps;
    newState[position].deleteSelector(element);
    this.setState({ siteMaps: newState });
  };

  HandleSiteUpdate (id, input, property) {
    let newState = this.state.siteMaps;
    let index = newState.findIndex(item => item.id === id);
    newState[index].updateSitemap(input, property);
    this.setState({ siteMaps: newState });
  }

  HandleSelectorChange = (input, position, element) => {
    let newState = this.state.siteMaps;
    newState[position].updateSelectorValue(element, input);
    this.setState({ siteMaps: newState });
  };

  AddSiteMap = (position) => {
    let newState = this.state.siteMaps;
    if (position) {
      newState = newState
        .slice(0, position + 1)
        .concat(new SiteMap())
        .concat(newState.slice(position + 1));
    } else {
      newState = newState.concat(new SiteMap());
    }
    this.setState({ siteMaps: newState });
  };

  DeleteItem = (id) => {
    let newState = this.state.siteMaps;
    newState = DeleteItem(newState, id);
    this.setState({ siteMaps: newState });
  };

  render() {
    const siteMaps = this.state.siteMaps;
    return (
      <div className="list-container">
        <SingleSrapeList 
        onSiteInputChange={(id, input, property) => this.HandleSiteUpdate(id,input, property)}
        onSelectorChange={(input, id) => this.HandleSelectorChange(input, id)}
        selectorValue ={(id) => this.getValue(id)}
        onAddSelector={(id, index) => this.addSelector(id, index)}
        onAddChild = {(id) => this.addSelector(id)}
        onDeleteSelector={(id) => this.deleteItem(id)}
        />
        <BiListPlus
          className="addNewList button"
          title="Add another scraping list"
          onClick={() => this.AddSiteMap()}
        />
      </div>
    );
  }
}

export default App;

/* */
