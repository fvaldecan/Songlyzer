import Checkbox from "../Checkbox/Checkbox";
const VisualOptions = ({ visuals, isChecked }) => {
  return (
    <div>
      <p>
        <b>Widget Options</b>
      </p>
      <ul>
        {visuals.map(({ name, disabled, checked }) => (
          <Checkbox
            key={name}
            feature={name}
            isDisabled={disabled}
            isChecked={isChecked}
            checked={checked}
          />
        ))}
      </ul>
    </div>
  );
};
export default VisualOptions;
