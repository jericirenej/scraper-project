import React, { Component, Fragment } from "react";
import { nanoid } from "nanoid";
import SingleSrapeList from "./components/singleList";
import { SiteMap, addSelector, deleteItem } from "./classes/ScrapeList.js";
import { BiListPlus as AddNewList } from "react-icons/bi";
import "./style.css";
import Header from "./components/header";

let initialArray = [];
initialArray.push(new SiteMap("InitialMap", "First Map"));
addSelector(initialArray, "InitialMap", 0, "First Selector");


class App extends Component {
  state = {
    siteMaps: initialArray,
  };

  getProperty = (id, property) => {
    let query = this.state.siteMaps;
    let index = query.findIndex(item => item.id === id);
    let value = query[index][property];
    return value;
  };

  onAddSelector = (targetID, index) => {
    let newState = this.state.siteMaps;
    addSelector(newState, targetID, index);
    this.setState({ siteMaps: newState });
  };

  handleSiteUpdate(id, input, property) {
    let newState = this.state.siteMaps;
    let index = newState.findIndex(item => item.id === id);
    newState[index][property] = input;
    this.setState({ siteMaps: newState });
  }

  addSiteMap = () => {
    let newState = this.state.siteMaps;
    let newListID = nanoid();
    newState.push(new SiteMap(newListID));
    addSelector(newState, newListID);
    this.setState({ siteMaps: newState });
  };

  onDeleteItem = id => {
    let newState = this.state.siteMaps;
    newState = deleteItem(newState, id);
    this.setState({ siteMaps: newState });
  };

  clearSiteMap = parent => {
    let newState = this.state.siteMaps;
    const children = parent.parentOf;
    for (let childID of children) {
      newState = deleteItem(newState, childID);
    }

    addSelector(newState, parent.id);
    this.setState({ siteMaps: newState });
  };

  render() {
    const siteMaps = this.state.siteMaps;
    return (
      <Fragment>
      <Header />
      <div className="list-container">
        <SingleSrapeList
          stateArray={siteMaps}
          onSiteInputChange={(id, input, property) =>
            this.handleSiteUpdate(id, input, property)
          }
          onSiteDelete={id => this.onDeleteItem(id)}
          onSelectorChange={(id, input, property) =>
            this.handleSiteUpdate(id, input, property)
          }
          selectorProperty={(id, property) => this.getProperty(id, property)}
          toggleMultipleCheck={(input)=> this.handleMultipleCheckToggle(input)}
          onAddSelector={(id, index) => this.onAddSelector(id, index)}
          onAddChild={id => this.onAddSelector(id)}
          onDeleteSelector={id => this.onDeleteItem(id)}
          onClearSiteMap={parent => this.clearSiteMap(parent)}
        />
        <AddNewList
          className="addNewList button"
          title="Add another scraping list"
          onClick={() => this.addSiteMap()}
        />
      </div>
      </Fragment>
    );
  }
}

export default App;

/* */
