import React from "react";
import { BsArrowReturnRight as AddChildIcon, BsPlusCircle as AddSelectorIcon, BsXSquare as DeleteIcon } from "react-icons/bs";

const SelectorControls = props => {
  const { AddChild, AddSelector, Delete, siblings, parentType } = props;
  return (
    <div className="selector-list controls">
      <AddChildIcon
        className="addChildButton button"
        onClick={AddChild}
        title="Add a child selector."
      />
      <AddSelectorIcon
        className="addSelectorButton button"
        title="Add a new selector for this list."
        onClick={AddSelector}
      />
      {/*Add Delete button only if the number of line items is greater than one.*/}
      {siblings > 1 || parentType !== "sitemap" ? (
        <DeleteIcon
          className="deleteSelectorButton button"
          title="Recursivelsy delete the current selector"
          onClick={Delete}
        />
      ) : null}
    </div>
  );
};

export default SelectorControls;
