import React from "react";

const MultipleCheck = ({ selectorID, checkedStatus, onSelectorChange }) => {
  return (
    <div className="selector-list multiple checkbox">
      <label htmlFor={`checkbox-${selectorID}`}>Multiple?</label>
      <input
        type="checkbox"
        onChange={input => onSelectorChange(input)}
        id={`checkbox-${selectorID}`}
        checked={checkedStatus}></input>
    </div>
  );
};

export default MultipleCheck;
