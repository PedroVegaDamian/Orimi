import React from 'react';

interface RadioProps {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    className?: string;
}

export const Radio: React.FC<RadioProps> = ({ id, name, value, checked, onChange, label, className }) => {
    return (
        <div className="form-group relative flex items-center">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={`absolute w-0 h-0 opacity-0 ${className}`}
            />
            <label htmlFor={id} className="flex items-center cursor-pointer">
                <span className={`w-4 h-4 border-2 rounded-full ${checked ? 'bg-primary_800_color border-primary_800_color' : 'bg-gray-100 border-gray-300'}`}></span>
                <span className="ml-2">{label}</span>
            </label>
        </div>
    );
};

export default Radio;
