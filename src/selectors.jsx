import React from 'react';
import { BsArrowReturnRight, BsPlusCircle, BsXSquare } from "react-icons/bs";

const Selector = props =>  {
const {onDelete, onAdd, onAddChild, onInputChange, index, inputValue, children, visible} = props;
  
  return (
    <div className={`selector-list wrapper ${ visible }`}>
      <div className="selector-list label">
        <label>Selector {index +1 }: </label>
      </div>
      <div className="selector-list input">
        <input 
          type="text"
          value={inputValue}
          placeholder="Enter selector"
          onChange={(input) => onInputChange(input, "selector")}
          id={index + 1}>
          </input>
      </div>
      <div className="selector-list controls">
        <BsArrowReturnRight
          className="addChildButton button" 
          onClick={onAddChild}/>
        <BsPlusCircle
          className="addSelectorButton button" 
          data-title="Add a new selector for this list."
          onClick={onAdd} />
        {/*Add Delete button only if the number of line items is greater than one.*/}
        {(children > 1) ? (<BsXSquare
          className="deleteSelectorButton button" 
          title="Delete the selector"
          onClick = {onDelete}/>)
          :null}
      </div>
    </div>
    )
  }
  
export default Selector;

