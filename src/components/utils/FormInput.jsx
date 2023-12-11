import React from 'react';

export const FormInput = ({ type, id, value, onChange, placeholder, className, checked, children }) => {
    switch (type) {
        case 'textarea':
            return (
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={className}
                />
            );
        case 'checkbox':
            return (
                <div className="flex items-center space-x-2">
                    <input
                        id={id}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        className={className}
                    />
                    <label htmlFor={id}>{children}</label>
                </div>
            );
        default:
            return (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="w-full p-2 border border-gray-300 rounded-lg leading-tight"
                />
            );
    }
};
