import React from "react";

const MultipleCheck = ({ selectorID, checkedStatus, toggleMultiple }) => {
  return (
    <div className="selector-list multiple checkbox">
      <label htmlFor={`checkbox-${selectorID}`}>Multiple?</label>
      <input
        type="checkbox"
        onChange={input => toggleMultiple(input)}
        id={`checkbox-${selectorID}`}
        checked={checkedStatus}></input>
    </div>
  );
};

export default MultipleCheck;
