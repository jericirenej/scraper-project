import React from "react";
import SelectorControls from "./selectorControls.jsx";
import TypeDropDown from "./dropDownMenu.jsx";
import { BiEraser as EraseSelectors } from "react-icons/bi";
import InputBox from "./inputBox.jsx";
import MultipleCheck from "./multipleCheckbox.jsx";

const Selector = props => {
  const {
    selectorID,
    onDeleteSelector,
    onSiteClear,
    onAddSelector,
    onAddChild,
    onSelectorChange,
    parentIndex,
    index,
    selectorValue,
    selectorName,
    selectedType,
    siblings,
    children,
    parentType,
    position,
    checkedStatus,
  } = props;
  return (
    <li
      className={`selector-list wrapper`}
      key={`lineItem-${selectorID}`}
      id={`lineItem-${selectorID}`}>
      <div className="selector-list label">
        <label htmlFor={selectorID}>
          Sel. {parentIndex ? `${parentIndex}.${index + 1}: ` : `${index + 1 }: `}
        </label>
      </div>
      <InputBox
        placeholder="Selector name"
        selectorID = {selectorID}
        subType="name"
        index={index}
        onSelectorChange={(input, type) => onSelectorChange(input, type)}
        selectorValue={selectorName}
      />
      <InputBox
      selectorID = {selectorID}
        placeholder="Selector definition"
        subType="value"
        index={index}
        onSelectorChange={input => onSelectorChange(input, "value")}
        selectorValue={selectorValue}
      />

      <TypeDropDown
        selectorID={selectorID}
        onTypeChange={input => onSelectorChange(input, "type")}
        selectedType = { selectedType }
        children = { children }
      />
      <MultipleCheck
        selectorID={selectorID}
        onSelectorChange={input => onSelectorChange(input, "multiple")}
        checkedStatus={checkedStatus}
      />
      <SelectorControls
        AddChild={onAddChild}
        AddSelector={onAddSelector}
        Delete={onDeleteSelector}
        /*onSiteClear={onSiteClear}*/
        siblings={siblings}
        parentType={parentType}
        position={position}
      />
      {/* Add Clear SiteMap to first selector */}
      {(siblings > 1 || children >= 1) && parentType === "sitemap" && position === 0 ? (
        <EraseSelectors
          className="clearSiteMapButton button"
          title="Clear all selectors."
          onClick={onSiteClear}
        />
      ) : null}
    </li>
  );
};

export default Selector;
