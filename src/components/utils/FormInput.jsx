import React from "react";

export const FormInput = ({
  type,
  id,
  value,
  onChange,
  placeholder,
  checked,
  children,
}) => {
  switch (type) {
    case "textarea":
      return (
        <fieldset className="fieldset">
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="input"
            required
          />
        </fieldset>
      );
    case "checkbox":
      return (
        <fieldset className="fieldset">
          <div className="flex items-center space-x-2">
            <input
              id={id}
              type="checkbox"
              checked={checked}
              onChange={onChange}
              className="input-checkbox"
            />
            <label htmlFor={id}>{children}</label>
          </div>
        </fieldset>
      );
    case "url":
      return (
        <fieldset className="fieldset">
          <input
            id={id}
            type="url"
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            autoComplete="off"
            className="input-url"
          />
        </fieldset>
      );
    default:
      return (
        <fieldset className="fieldset">
          <input
            id={id}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            className="input"
            required
          />
        </fieldset>
      );
  }
};
