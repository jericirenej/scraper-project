import React from 'react';


const SiteMapURL = props => {
  const { urlValue, siteName, onSiteInputChange, urlProp, nameProp } = props
  return (
    <div className="list wrapper">
      <div className="list-name label">
        <label>List name: </label>
      </div>
      <div className="list-name input">
          <input 
            type="text"
            placeholder= "Enter a name"
            value = {siteName}
            onChange= {(input) => onSiteInputChange(input, nameProp)}/>
      </div>
      <div className ="list-URL label">
        <label>URL: </label>
      </div>
      <div className="list-URL input">
        <input 
          type="text"
          placeholder="Enter URL address"
          value = {urlValue}
          onChange = {(input) => onSiteInputChange(input, urlProp)}/>
      </div>
    </div>
   );
}
 
export default SiteMapURL;