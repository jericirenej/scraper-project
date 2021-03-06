import React from "react";
import { BiTrash as DeleteList } from "react-icons/bi";

const SiteMapURL = props => {
  const {
    urlValue,
    siteName,
    onSiteInputChange,
    urlProp,
    nameProp,
    siteNum,
    onSiteDelete,
  } = props;
  return (
    <div className="list wrapper">
      <div className="list-name label">
        <label>List: </label>
      </div>
      <div className="list-name input">
        <input
          type="text"
          placeholder="Sitemap name"
          value={siteName}
          onChange={input => onSiteInputChange(input, nameProp)}
        />
      </div>
      <div className="list-URL label">
        <label>URL: </label>
      </div>
      <div className="list-URL input">
        <input
          type="text"
          placeholder="URL address"
          value={urlValue}
          onChange={input => onSiteInputChange(input, urlProp)}
        />
      </div>
      <div className="list-delete">
        {siteNum > 1 ? (
          <DeleteList
            className="deleteList button"
            title="Delete the current sitemap."
            onClick={onSiteDelete}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SiteMapURL;
