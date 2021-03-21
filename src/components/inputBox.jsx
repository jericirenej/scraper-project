const InputBox = props => {
  const { selectorID, selectorValue, index, placeholder, subType, onSelectorChange } = props;
  return (
    <div className={`selector-list ${subType}`} id={`${selectorID}-${subType}`}>
      <input
        type="text"
        value={selectorValue}
        placeholder={placeholder}
        onChange={(input) => onSelectorChange(input, subType)}
        id={`${subType}-${index + 1}`}></input>
    </div>
  );
};

export default InputBox;
