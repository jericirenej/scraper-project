import React, { Fragment } from "react";
import SiteMapURL from "./urlInput.jsx";
import Selector from "./selectors.jsx";

const SingleSrapeList = props => {
  const {
    onSiteInputChange,
    onSiteDelete,
    onSelectorChange,
    selectorValue,
    onAddSelector,
    onAddChild,
    onDeleteSelector,
    onClearSiteMap,
    stateArray,
  } = props;
  const siteMaps = stateArray.filter(item => item.componentClass === "sitemap");
  const selectors = stateArray.filter(item => item.componentClass === "selector");

  function RecursiveRender(selectors, parent) {
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
              urlValue={parent.value}
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
              <Fragment>
                <Selector
                  key={selector.id}
                  selectorID={selector.id}
                  index={parent.parentOf.findIndex(element => element === selector.id)}
                  siblings={parent.parentOf.length}
                  children={selector.parentOf.length}
                  parentType={parent.componentClass}
                  position={parent.parentOf.findIndex(item => item === selector.id)}
                  selectorValue={selectorValue(selector.id)}
                  onSelectorChange={input =>
                    onSelectorChange(selector.id, input.target.value, "value")
                  }
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
                    {RecursiveRender(selectors, selector)}
                  </ul>
                ) : null}
              </Fragment>
            );
          })}
        </ul>
      );
    }
  }

  return <Fragment>{siteMaps.map(list => RecursiveRender(selectors, list))}</Fragment>;
};

export default SingleSrapeList;
