import React from 'react';
import { BiTrash } from "react-icons/bi";

const UrlInput = props => {
  const { urlValue, nameValue, onInputChange, onSiteDelete, urlProp, nameProp, siteMaps } = props
  return (
    <div className="list wrapper">
      <div className="list-name-label">
        <label>List name: </label>
      </div>
      <div className="list-name-input">
          <input 
            type="text"
            placeholder= "Enter a name"
            value = {nameValue}
            onChange= {(input) => onInputChange(input, nameProp)}/>
      </div>
      <div className ="list-URL-label">
        <label>URL: </label>
      </div>
      <div className="list-URL-input">
        <input 
          type="text"
          placeholder="Enter URL address"
          value = {urlValue}
          onChange = {(input) => onInputChange(input, urlProp)}/>
      </div>
      {/*Add Delete button only if the number of siteMaps is greater than one.*/}
      <div className="list-delete-button">
       {(siteMaps > 1) ? (<BiTrash 
          className="deleteList button" 
          onClick= {() => onSiteDelete()}/>)
          : null}
      </div>
    </div>
   );
}
 
export default UrlInput;