import React, { Fragment } from "react";
import SiteMapURL from "./urlInput.jsx";
import Selector from "./selectors.jsx";

const SingleSrapeList = (props) => {
  const {
    onSiteInputChange,
    onSiteDelete,
    onSelectorChange,
    selectorValue,
    onAddSelector,
    onAddChild,
    onDeleteSelector,
    stateArray,
  } = props;
  const siteMaps = stateArray.filter((item) => item.componentClass === "sitemap");
  const selectors = stateArray.filter((item) => item.componentClass === "selector");

  function RecursiveRender(selectors, parent) {
    const childIDs = parent.parentOf;
    const children = childIDs
      .map((item) => selectors.filter((element) => element.id === item))
      .flat();
    if (children) {
      console.log("CHILDREN", children)
      return (
        <ul key={parent.id} id={parent.id}>
          {parent.componentClass === "sitemap" ? (
            <SiteMapURL
              urlValue={parent.value}
              siteName={parent.name}
              urlProp="url"
              nameProp="name"
              onSiteInputChange={(input, property) =>
                onSiteInputChange(parent.id, input.target.value, property)
              }
              onSiteDelete={() => onSiteDelete(parent.id)}
            />
          ) : null}
      
          {children.map((selector) => {
            return (
              <Fragment>
                <Selector
                  key={selector.id}
                  selectorID={selector.id}
                  index={parent.parentOf.findIndex((element) => element === selector.id)}
                  siblings={parent.parentOf.length}
                  selectorValue={selectorValue(selector.id)}
                  onSelectorChange={(input) =>
                    onSelectorChange(selector.id, input.target.value, "value")
                  }
                  onAddSelector={() =>
                    onAddSelector(
                      parent.id,
                      parent.parentOf.findIndex((element) => element === selector.id)
                    )
                  }
                  onAddChild={() => onAddChild(selector.id)}
                  onDeleteSelector={() => onDeleteSelector(selector.id)}
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

  //const result = siteMaps.map(list => RecursiveRender(selectors, list))

  return (
    <Fragment>{siteMaps.map((list) => RecursiveRender(selectors, list))}</Fragment>
  );
};

export default SingleSrapeList;
