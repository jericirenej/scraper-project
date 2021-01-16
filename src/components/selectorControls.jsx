import React from "react";
import { BsArrowReturnRight, BsPlusCircle, BsXSquare } from "react-icons/bs";

const SelectorControls = props => {
  const {AddChild, AddSelector, Delete, siblings} = props;
  return (  
    <div className="selector-list controls">
        <BsArrowReturnRight
          className="addChildButton button" 
          onClick={AddChild}/>
        <BsPlusCircle
          className="addSelectorButton button" 
          title="Add a new selector for this list."
          onClick={AddSelector} />
        {/*Add Delete button only if the number of line items is greater than one.*/}
        {(siblings > 1) ? (<BsXSquare
          className="deleteSelectorButton button" 
          title="Delete the selector"
          onClick = {Delete}/>)
          :null}
      </div>
  );
}
 
export default SelectorControls;