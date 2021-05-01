import React from "react";

const MultipleCheck = ({ selectorID, checkedStatus, onSelectorChange }) => {
  return (
    <div className="selector-list multiple checkbox">
      <label htmlFor={`checkbox-${selectorID}`}>Multiple?</label>
      <input
        type="checkbox"
        onChange={input => {
          input.target.checked
            ? (input.target.value = true)
            : (input.target.value = false);
          onSelectorChange(input);
        }}
        id={`checkbox-${selectorID}`}
        checked = { checkedStatus === "true" }></input>
    </div>
  );
};

export default MultipleCheck;
