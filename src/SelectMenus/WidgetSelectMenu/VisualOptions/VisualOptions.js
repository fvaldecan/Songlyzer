import Checkbox from "../Checkbox/Checkbox";
const VisualOptions = ({ visuals: { plain_text, bar, radix }, isChecked }) => {
  return (
    <div>
      Widget Options
      <ul>
        <Checkbox
          key={plain_text.options}
          feature={plain_text.options}
          isDisabled={plain_text.disabled}
          isChecked={isChecked}
        />

        <Checkbox
          key={bar.options}
          feature={bar.options}
          isDisabled={bar.disabled}
          isChecked={isChecked}
        />
        <Checkbox
          key={radix.options}
          feature={radix.options}
          isDisabled={radix.disabled}
          isChecked={isChecked}
        />
      </ul>
    </div>
  );
};
export default VisualOptions;
