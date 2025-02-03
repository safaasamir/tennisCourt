function Input({
  label,
  placeholder,
  icon,
  type = "text",
  name,
  value,
  onChange,
  disabled = false,
  errors,
  onBlur,
  dir,
  style,
 
}) {
  return (
    <div className="w-full mb-5">
      <span
        className={`${errors?" text-red-500":"text-mainTextColor"} ${
          disabled ? "text-gray-400" : "text-mainTextColor font-bold"
        }`}
      >
        {label}
      </span>
      <label
        className={`input input-bordered flex items-center gap-2 ${
          errors ? "border border-red-500 focus:ring-red-500" : "border-gray-300"
        }`}
      >
        {icon && (
          <span className="flex items-center justify-center w-4 h-4 opacity-70">
            {icon}
          </span>
        )}
        <input
        
          type={type}
          name={name}
          placeholder={placeholder}
          className={`grow `}
          dir={dir} 
          value={value}
          onChange={onChange}
          disabled={disabled}
          onBlur={onBlur}
           style={style}
        />
      </label>
      {errors && (
        <p  className="mt-1.5 text-sm text-red-500" role="alert">
          {errors}
        </p>
      )}
    </div>
    
  );
}

export default Input;
