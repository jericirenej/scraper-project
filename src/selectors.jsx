import React, { Fragment } from 'react';
import { BsArrowReturnRight, BsPlusCircle, BsXSquare } from "react-icons/bs";

const Selector = props =>  {
const {onDelete, onAdd, onAddChild, onInputChange, index, inputValue, children} = props;
  
  return (
    <Fragment>
        <label>Selector {index +1 }: </label>
        <input 
          type="text"
          value={inputValue}
          placeholder="Enter selector"
          onChange={(input) => onInputChange(input, "selector")}
          id={index + 1}>
          </input>
        <BsPlusCircle
          className="addSelectorButton button" 
          data-title="Add a new selector for this list."
          onClick={onAdd} />
        <BsArrowReturnRight
          className="addChildButton button" 
          onClick={onAddChild}/>
        {/*Add Delete button only if the number of line items is greater than one.*/}
        {(children > 1) ? (<BsXSquare
          className="deleteSelectorButton button" 
          title="Delete the selector"
          onClick = {onDelete}/>)
          :null}
    </Fragment>
    )
  }
  
export default Selector;

