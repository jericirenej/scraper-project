const TypeDropDown = ({ selectorID, onTypeChange, selectedType, children }) => {
  const selectOptions = ["", "text", "click", "link"];
  return (
    <div className="selector-list type">
      <label htmlFor={`selector-${selectorID}`}>Type</label>
      <select
        onChange={input => onTypeChange(input)}
        name="selector-type-select"
        id={`selector-${selectorID}`}
        value={selectedType}
        disabled={children}>
        {selectOptions.map((option, index) => (
          <option key={`${selectorID}-${index}`} value={option} hidden={option === ""}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeDropDown;
