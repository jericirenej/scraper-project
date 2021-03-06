import React, { Fragment } from "react";
import SiteMapURL from "./urlInput.jsx";
import Selector from "./selectors.jsx";
import PassIndex from "./PassIndex.js";

const SingleSrapeList = props => {
  const {
    onSiteInputChange,
    onSiteDelete,
    onSelectorChange,
    selectorProperty,
    onAddSelector,
    onAddChild,
    onDeleteSelector,
    onClearSiteMap,
    stateArray,
  } = props;
  const siteMaps = stateArray.filter(item => item.componentClass === "sitemap");
  const selectors = stateArray.filter(item => item.componentClass === "selector");


  function RecursiveRender(selectors, parent, siteMaps) {
    const childIDs = parent.parentOf;
    const children = childIDs
      .map(item => selectors.filter(element => element.id === item))
      .flat();
    if (children) {
      return (
        <ul
          key={parent.id}
          id={parent.id}
          className={parent.componentClass === "sitemap" ? "singleList" : ""}>
          {parent.componentClass === "sitemap" ? (
            <SiteMapURL
              key={`url--${parent.id}`}
              urlValue={parent.url}
              siteName={parent.name}
              urlProp="url"
              nameProp="name"
              onSiteInputChange={(input, property) =>
                onSiteInputChange(parent.id, input.target.value, property)
              }
              onSiteDelete={() => onSiteDelete(parent.id)}
              siteNum={siteMaps.length}
            />
          ) : null}

          {children.map(selector => {
            return (
              <Fragment key={`Fragment-${selector.id}`}>
                <Selector
                  key={selector.id}
                  selectorID={selector.id}
                  parentIndex= {parent.componentClass !== "sitemap" ? PassIndex(parent, selectors, siteMaps) : null}
                  index={parent.parentOf.findIndex(element => element === selector.id)}
                  siblings={parent.parentOf.length}
                  children={selector.parentOf.length}
                  parentType={parent.componentClass}
                  position={parent.parentOf.findIndex(item => item === selector.id)}
                  selectorName={selectorProperty(selector.id, "name")}
                  selectorValue={selectorProperty(selector.id, "value")}
                  selectedType = { selectorProperty(selector.id, "type") }
                  onSelectorChange={(input, type) =>
                    onSelectorChange(selector.id, input.target.value, type)
                  }
                  checkedStatus={selectorProperty(selector.id, "multiple")}
                  onAddSelector={() =>
                    onAddSelector(
                      parent.id,
                      parent.parentOf.findIndex(element => element === selector.id)
                    )
                  }
                  onAddChild={() => onAddChild(selector.id)}
                  onDeleteSelector={() => onDeleteSelector(selector.id)}
                  onSiteClear={() => onClearSiteMap(parent)}
                />
                {selector.parentOf.length ? (
                  <ul key={`${selector.id}-children`}>
                    {RecursiveRender(selectors, selector, siteMaps)}
                  </ul>
                ) : null}
              </Fragment>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <Fragment>
      {siteMaps.map(singleList => RecursiveRender(selectors, singleList, siteMaps))}
    </Fragment>
  );
};

export default SingleSrapeList;
