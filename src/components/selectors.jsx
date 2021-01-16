import React from "react";
import SelectorControls from "./selectorControls.jsx";

const Selector = (props) => {
  const {
    selectorID,
    onDeleteSelector,
    onAddSelector,
    onAddChild,
    onSelectorChange,
    index,
    selectorValue,
    siblings,
  } = props;

  return (

    <li className={`selector-list wrapper`} id = {`lineItem-${selectorID}`}>
      <div className="selector-list label">
        <label htmlFor={selectorID}>Selector {index + 1}: </label>
      </div>
      <div className="selector-list input" id={selectorID}>
        <input
          type="text"
          value={selectorValue}
          placeholder="Enter selector"
          onChange={(input) => onSelectorChange(input)}
          id={index + 1}
        ></input>
      </div>
      <SelectorControls
        AddChild={onAddChild}
        AddSelector={onAddSelector}
        Delete={onDeleteSelector}
        siblings={siblings}
      />
    </li>
  );
};

export default Selector;
