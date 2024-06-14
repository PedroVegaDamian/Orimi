import React from 'react';

interface CheckboxProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, name, checked, onChange, label }) => {
    return (
        <div className="form-group relative flex items-center mt-2">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                className="absolute w-0 h-0 opacity-0"
            />
            <label htmlFor={id} className="flex items-center cursor-pointer">
                <span className={`w-4 h-4 border-2 rounded ${checked ? 'bg-primary_800_color border-primary_800_color' : 'bg-gray-100 border-gray-300'}`}></span>
                <span className="ml-2">{label}</span>
            </label>
        </div>
    );
};

export default Checkbox;
