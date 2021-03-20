import React from "react";
import SelectorControls from "./selectorControls.jsx";
import TypeDropDown from "./dropDownMenu.jsx";
import { BiEraser as EraseSelectors} from "react-icons/bi";
import MultipleCheck from "./multipleCheckbox.jsx";

const Selector = props => {
  const {
    selectorID,
    onDeleteSelector,
    onSiteClear,
    onAddSelector,
    onAddChild,
    onSelectorChange,
    index,
    selectorValue,
    selectorName,
    namePrePend,
    siblings,
    children,
    parentType,
    position,
    checkedStatus,
  } = props;
  return (
    <li
      className={`selector-list wrapper`}
      key={`lineItem-${selectorID}`}
      id={`lineItem-${selectorID}`}>
      <div className="selector-list label">
        <label htmlFor={selectorID}>
          {namePrePend} {index + 1}:{" "}
        </label>
      </div>
      <div className="selector-list name" id={`${selectorID}-name`}>
        <input
          type="text"
          value={selectorName}
          placeholder="Name"
          onChange={input => onSelectorChange(input, "name")}
          id={index + 1}></input>
      </div>
      <div className="selector-list input" id={`${selectorID}-value`}>
        <input
          type="text"
          value={selectorValue}
          placeholder="Enter selector"
          onChange={input => onSelectorChange(input, "value")}
          id={index + 1}></input>
      </div>
      <TypeDropDown selectorID={selectorID} onTypeChange={input => onSelectorChange(input, "type")}/>
      <MultipleCheck selectorID = {selectorID} onSelectorChange={input => onSelectorChange(input, "multiple")}checked={checkedStatus}/>
      <SelectorControls
        AddChild={onAddChild}
        AddSelector={onAddSelector}
        Delete={onDeleteSelector}
        /*onSiteClear={onSiteClear}*/
        siblings={siblings}
        parentType={parentType}
        position={position}
      />
      {/* Add Clear SiteMap to first selector */}
      {(siblings > 1 || children >= 1) && parentType === "sitemap" && position === 0 ? (
        <EraseSelectors
          className="clearSiteMapButton button"
          title="Clear all selectors."
          onClick={onSiteClear}
        />
      ) : null}
    </li>
  );
};

export default Selector;
