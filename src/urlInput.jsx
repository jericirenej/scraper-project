import React from 'react';

const UrlInput = props => {
  const { url, inputValue, onInputChange } = props
  return (
    <ul className="url-input">
      <li><label>Enter URL</label>
      <input 
        type="text"
        placeholder="Enter URL"
        />
      </li>
    </ul>
   );
}
 
export default UrlInput;