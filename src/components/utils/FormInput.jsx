import React from 'react';

export const FormInput = ({ type, id, value, onChange, placeholder, checked, children }) => {
    switch (type) {
        case 'textarea':
            return (
                <fieldset className="space-y-2">
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className= "w-full p-2 border border-gray-300 rounded-lg"
                    />
                    </fieldset>
            );
        case 'checkbox':
            return (
                <fieldset className="space-y-2">
                <div className="flex items-center space-x-2">
                    <input
                        id={id}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        className="appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-green checked:border-transparent focus:outline-none"
                    />
                    <label htmlFor={id}>{children}</label>
                </div>
                </fieldset>
            );
        case 'url':
                return (
                    <fieldset className="space-y-2">
                    <input
                        id={id}
                        type="url"
                        onChange={onChange}
                        placeholder={placeholder}
                        value={value}
                        autoComplete="off"
                        className="w-full p-2 border border-gray-300 rounded-lg leading-tight m-1"
                        />
                        </fieldset>
                );
        default:
            return (
                <fieldset className="space-y-2">
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="w-full p-2 border border-gray-300 rounded-lg leading-tight"
                    />
                    </fieldset>
            );
    }
};
