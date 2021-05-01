const PassIndex = (parent, selectors, siteMaps) => {
  if (parent.componentClass === "sitemap") {
    return;
  }
  let indexArray = [];
  let ancestorClass = "selector";
  let ancestor = parent;
  while (ancestorClass !== "sitemap") {
    indexArray.push(ExtractIndex(ancestor, selectors, siteMaps));
    //console.log("Intermediate array indices: ", indexArray.reverse());
    const ancestorID = ancestor.childOf[0];
    siteMaps.filter(entry => entry.id === ancestorID).length === 0
      ? (ancestor = selectors.filter(entry => entry.id === ancestorID)[0])
      : (ancestorClass = "sitemap");
  }

  return indexArray.join(".");
};

const ExtractIndex = (parent, selectors, siteMaps) => {
  let targetArray = [];

  siteMaps.filter(entry => entry.parentOf.includes(parent.id)).length > 0
    ? (targetArray = siteMaps)
    : (targetArray = selectors);

  //console.log("Target array: ", targetArray);
  const targetElement = targetArray.filter(entry => entry.parentOf.includes(parent.id));
  return targetElement[0].parentOf.findIndex(children => children === parent.id) + 1;
};

export default PassIndex;
