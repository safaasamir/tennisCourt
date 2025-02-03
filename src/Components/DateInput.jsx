import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ar } from "date-fns/locale";
import { useLanguage } from "../context/LanguageContext";

function DataInput(props) {
  const { language } = useLanguage();
  const {
    label,

    icon,

    value,
    onChange,
    disabled = false,
    errors,
    onBlur,
  } = props;

  return (
    <div className="w-full mb-5">
      <span
        className={`${errors ? " text-red-500" : "text-mainTextColor"} ${
          disabled ? "text-gray-400" : "text-mainTextColor font-bold"
        }`}
      >
        {label}
      </span>
      <label
        className={`input input-bordered flex items-center gap-2 ${
          errors
            ? "border border-red-500 focus:ring-red-500"
            : "border-gray-300"
        }`}
      >
        {icon && (
          <span className="flex items-center justify-center w-4 h-4 opacity-70">
            {icon}
          </span>
        )}
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={(date) => {
            onChange(date), onBlur();
          }}
          dateFormat={language === "ar" ? "dd/MM/yyyy" : "yyyy-MM-dd"}
          locale={language === "ar" ? ar : undefined}
          placeholderText={language === "ar" ? "يوم/شهر/سنة" : "YYYY-MM-DD"}
          className="form-input"
          {...props}
          popperPlacement={language === "ar" ? "bottom-end" : "bottom-start"}
          style={{
            textAlign: language === "ar" ? "right" : "left",
            direction: language === "ar" ? "rtl" : "ltr",
          }}
          onBlur={onBlur}
        />
      </label>
      {errors && (
        <p className="mt-1.5 text-sm text-red-500" role="alert">
          {errors}
        </p>
      )}
    </div>
  );
}
export default DataInput;
