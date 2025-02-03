import Select from "react-select";
import { components } from "react-select";
const LoadingIndicator = () => (
  <div className="flex justify-center items-center">
    <div className="spinner">
      <img src="./spinner.gif" alt="loading" width={"35px"} />
    </div>
  </div>
);
function SelectComponent(props) {
  const {
    placeholder,
    options,
    onChange,
    label,
    value,
    name,
    onBlur,
    errors,
    required = false,
    isMulti = false,
    dir,
    disabled = false,
    selectLoading = false,
  } = props;

  const customStyle = {
    control: (provided, state) => ({
      ...provided,
      height: "46px",
      borderRadius: "7px",
      boxShadow: "none",
      textAlign: dir === "rtl" ? "right" : "left",
      border: errors ? "1px solid red" : "1px solid #ccc",
      backgroundColor: state.isDisabled ? "#f9fafb" : "white",
      color: state.isDisabled ? "#6b7280" : "black",
      cursor: state.isDisabled ? "not-allowed" : "default",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      color: state.isSelected ? "black" : state.isFocused ? "black" : "grey",
      backgroundColor: state.isSelected
        ? "#fff8f6"
        : state.isFocused
        ? "#fff8f6"
        : "white",
      textAlign: dir === "rtl" ? "right" : "left",
    }),
  };

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          className={`${
            disabled ? "text-gray-400" : "text-text"
          } block  font-bold `}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Select
        options={options}
        styles={customStyle}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        name={name}
        required={required}
        aria-invalid={!!errors}
        aria-describedby={`${errors ? name + "-error" : ""}`}
        isMulti={isMulti}
        isDisabled={disabled}
        onBlur={onBlur}
        dir={dir}
        selectLoading={selectLoading}
        components={{
          DropdownIndicator: selectLoading
            ? LoadingIndicator
            : components.DropdownIndicator,
        }}
      />

      {errors ? (
        <span id={`${name}-error`} className="text-red-500 text-sm mt-1">
          {errors}
        </span>
      ) : null}
    </div>
  );
}

export default SelectComponent;
