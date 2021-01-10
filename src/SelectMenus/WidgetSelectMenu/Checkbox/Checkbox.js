const Checkbox = ({ feature, isChecked, isDisabled }) => {
  let text = feature
    .split("_")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  return (
    <>
      <input
        onClick={isChecked}
        type="checkbox"
        id={feature}
        value={feature}
        disabled={isDisabled}
      />
      <label htmlFor={feature}>{text}</label>
    </>
  );
};
export default Checkbox;