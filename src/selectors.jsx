import React from 'react';
import controlButtons from './selectorButtons';

const Selector = props =>  {
const {selectorID, onDelete, onAdd, onAddChild, onInputChange, index, inputValue, siblings, visible} = props;
  
  return (
    <div className={`selector-list wrapper ${ visible }`}>
      <div className="selector-list label">
        <label htmlFor={selectorID} >Selector {index +1 }: </label>
      </div>
      <div className="selector-list input" id={selectorID}>
        <input 
          type="text"
          value={inputValue}
          placeholder="Enter selector"
          onChange={(input) => onInputChange(input, "selector")}
          id={index + 1}>
          </input>
      </div>
      <controlButtons 
        AddChild={onAddChild} AddSelector={onAdd}
        Delete={onDelete} siblings={siblings}
      />
    </div>
    )
  }
  
export default Selector;

