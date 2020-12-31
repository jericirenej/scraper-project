import React, { Fragment } from 'react';


const Selector = props =>  {
  
  const {onDelete, onAdd, onInputChange, index, inputValue, children} = props;
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
        <button type="button" style ={ {cursor: "pointer"} } onClick={onAdd}>+</button>
        {/*Add Delete button only if the number of line items is greater than one.*/}
        {(children > 1) ? (<button type="button" style ={ {cursor: "pointer"} } onClick = {onDelete}>X</button>):null}
    </Fragment>
    )
  }
  
export default Selector;

