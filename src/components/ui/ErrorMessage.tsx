import React from 'react';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;

    return (
        <p className="text-red_color p-2 font-nunito font-bold text-12 lg:ml-[20px]">
            {message}
        </p>
    );
};

export default ErrorMessage;
