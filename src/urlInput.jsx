import React, { Fragment } from 'react';
import { BiTrash } from "react-icons/bi";

const UrlInput = props => {
  const { urlValue, nameValue, onInputChange, onSiteDelete, urlProp, nameProp, siteMaps } = props
  return (
    <Fragment>
    <div className="listHeader">
      <label>List name: </label>
        <input 
          type="text"
          placeholder= "Enter a name"
          value = {nameValue}
          onChange= {(input) => onInputChange(input, nameProp)}
        />
      <label>URL: </label>
      <input 
        type="text"
        placeholder="Enter URL address"
        value = {urlValue}
        onChange = {(input) => onInputChange(input, urlProp)}
      />
      {/*Add Delete button only if the number of siteMaps is greater than one.*/}
      {(siteMaps > 1) ? (<BiTrash 
          className="deleteList button" 
          onClick= {() => onSiteDelete()}/>)
        : null}
    </div>
    </Fragment>
   );
}
 
export default UrlInput;