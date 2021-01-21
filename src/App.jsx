import React, { Component } from "react";
import { nanoid } from "nanoid";
import SingleSrapeList from "./components/singleList";
import { SiteMap, AddSelector, DeleteItem } from "./classes/ScrapeList.js";
import { BiListPlus } from "react-icons/bi";
import "./style.css";

let initialArray = [];
initialArray.push(new SiteMap("InitialMap", "First Map"));
AddSelector(initialArray, "InitialMap", 0, "First Selector");

class App extends Component {
  state = {
    siteMaps: initialArray,
  };

  getValue = id => {
    let query = this.state.siteMaps;
    let index = query.findIndex(item => item.id === id);
    let value = query[index].value;
    return value;
  };

  addSelector = (targetID, index) => {
    let newState = this.state.siteMaps;
    AddSelector(newState, targetID, index);
    this.setState({ siteMaps: newState });
  };

  DeleteSelector = (position, element) => {
    let newState = this.state.siteMaps;
    newState[position].deleteSelector(element);
    this.setState({ siteMaps: newState });
  };

  HandleSiteUpdate(id, input, property) {
    let newState = this.state.siteMaps;
    let index = newState.findIndex(item => item.id === id);
    newState[index][property] = input;
    this.setState({ siteMaps: newState });
  }

  AddSiteMap = () => {
    let newState = this.state.siteMaps;
    let newListID = nanoid();
    newState.push(new SiteMap(newListID));
    AddSelector(newState, newListID);
    this.setState({ siteMaps: newState });
  };

  DeleteItem = id => {
    let newState = this.state.siteMaps;
    newState = DeleteItem(newState, id);
    this.setState({ siteMaps: newState });
  };

  ClearSiteMap = parent => {
    let newState = this.state.siteMaps;
    const children = parent.parentOf;
    for (let childID of children) {
      newState = DeleteItem(newState, childID);
    }

    AddSelector(newState, parent.id);
    this.setState({ siteMaps: newState });
  };

  render() {
    const siteMaps = this.state.siteMaps;
    return (
      <div className="list-container">
        <SingleSrapeList
          stateArray={siteMaps}
          onSiteInputChange={(id, input, property) =>
            this.HandleSiteUpdate(id, input, property)
          }
          onSiteDelete={id => this.DeleteItem(id)}
          onSelectorChange={(id, input, property) =>
            this.HandleSiteUpdate(id, input, property)
          }
          selectorValue={id => this.getValue(id)}
          onAddSelector={(id, index) => this.addSelector(id, index)}
          onAddChild={id => this.addSelector(id)}
          onDeleteSelector={id => this.DeleteItem(id)}
          onClearSiteMap={parent => this.ClearSiteMap(parent)}
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
