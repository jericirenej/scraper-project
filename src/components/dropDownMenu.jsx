import React, { Fragment } from "react";

const TypeDropDown = ({ selectorID, onTypeChange }) => {
  return (
    <div className="selector-list type">
      <label htmlFor={`selector-${selectorID}`}>Type</label>
      <select
        onChange={input => onTypeChange(input)}
        name="selector-type-select"
        id={`selector-${selectorID}`}>
        <option value="" hidden></option>
        <option value="Link">Link</option>
        <option value="Text">Text</option>
      </select>
    </div>
  );
};

export default TypeDropDown;
