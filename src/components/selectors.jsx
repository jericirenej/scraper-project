import React from "react";
import SelectorControls from "./selectorControls.jsx";
import { BiEraser } from "react-icons/bi";

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
    namePrePend,
    siblings,
    children,
    parentType,
    position,
    toggleMultiple,
    checkedStatus
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
      <div className="selector-list input" id={selectorID}>
        <input
          type="text"
          value={selectorValue}
          placeholder="Enter selector"
          onChange={input => onSelectorChange(input)}
          id={index + 1}></input>
      </div>
      <div className="selector-list multiple checkbox">
        <label htmlFor={`checkbox-${selectorID}`}>Multiple?</label>
        <input
          type="checkbox"
          onChange={input => toggleMultiple(input)}
          id={`checkbox-${selectorID}`}
          checked={checkedStatus}
        ></input>
      </div>
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
        <BiEraser
          className="clearSiteMapButton button"
          title="Clear all selectors."
          onClick={onSiteClear}
        />
      ) : null}
    </li>
  );
};

export default Selector;
