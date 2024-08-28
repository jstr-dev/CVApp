import React from 'react';
import Loader from './Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    buttonStyle?: 'default' | 'secondary';
}

const styles = {
    default: 'text-white bg-black hover:bg-neutral-950 focus:ring-gray-300 focus:ring-0.5',
    secondary: 'text-gray-900 content-col border border-gray-300 hover:bg-gray-200 focus:ring-0.5 focus:ring-gray-100 floatbox'
}

export default function Button({ loading, className, children, buttonStyle = 'default', ...defaultProps }: ButtonProps) {
    let ButtonStyles =
        styles[buttonStyle] +
        " transition focus:outline-none focus:ring-0.5 " +
        "font-medium rounded-lg text-sm py-2.5 flex flex-row justify-center items-center px-4";

    return (
        <button {...defaultProps} className={ButtonStyles + " " + (className ?? '')}>
            {loading &&
                <Loader />
            }

            {children}
        </button>
    );
}
