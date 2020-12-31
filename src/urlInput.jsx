import React from 'react';

const UrlInput = props => {
  const { urlValue, nameValue, onInputChange, urlProp, nameProp } = props
  return (
    <div>
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
    </div>
   );
}
 
export default UrlInput;