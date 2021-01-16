import React, { Fragment } from "react";
import SiteMapURL from "./urlInput.jsx";
import Selector from "./selectors.jsx";

const SingleSrapeList = (props) => {
  const siteMaps = props.SiteMap.filter((item) => item.componentClass === "sitemap");
  const selectors = props.SiteMap.filter(
    (item) => item.componentClass === "selector"
  );

  const {
    onSiteInputChange,
    onSelectorChange,
    selectorValue,
    onAddSelector,
    onAddChild,
    onDeleteSelector,
  } = props;

  function RecursiveRender(selectors, parent) {
    const childIDs = parent.parentOf;
    const children = childIDs
      .map((item) => selectors.filter((element) => element.id === item))
      .flat();
    if (children) {
      return (
        <ul key={parent.id} id={parent.id}>
          <SiteMapURL
            urlValue={parent.value}
            siteName={parent.name}
            urlProp="url"
            nameProp="name"
            onSiteInputChange={(input, property) =>
              onSiteInputChange(parent.id, input.target.value, property)
            }
          />
          {children.map((item) => {
            return (
              <Fragment>
                <Selector
                  key={item.id}
                  selectorID={item.id}
                  selectorIndex={parent.parentOf.findIndex(item)}
                  siblings={parent.parentOf.length}
                  inputValue={() => selectorValue(item.id)}
                  onSelectorChange={(input) =>
                    onSelectorChange(input.target.value, item.id)
                  }
                  onAddSelector={() =>
                    onAddSelector(
                      parent.id,
                      parent.parentOf.findIndex((element) => element.id === item.id)
                    )
                  }
                  onAddChild={() => onAddChild(item.id)}
                  onDeleteSelector={() => onDeleteSelector(item.id)}
                />
                {item.parentOf.length ? (
                  <ul key={`${item.id}-children`}>
                    {this.RecursiveRender(selectors, item)}
                  </ul>
                ) : null}
              </Fragment>
            );
          })}
          )
        </ul>
      );
    }
  }

  return (
    <Fragment>{siteMaps.map((list) => RecursiveRender(selectors, list))}</Fragment>
  );
};

export default SingleSrapeList;
