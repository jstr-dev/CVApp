import React from 'react';
import Loader from './Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export default function Button({ loading, className, children, ...defaultProps }: ButtonProps) {
    let ButtonStyles =
        "text-white bg-gray-800 hover:bg-gray-900 " +
        "focus:outline-none focus:ring-0.5 focus:ring-gray-300 "+
        "font-medium rounded-lg text-sm py-2.5 flex flex-row justify-center items-center px-4";

    return (
        <button {...defaultProps} className={ButtonStyles + " " + className}>
            {loading &&
                <Loader />
            }

            {children}
        </button>
    );
}
