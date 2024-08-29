import React from 'react';
import Loader from './Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    buttonStyle?: 'default' | 'secondary';
    size?: 'base' | 'small';
}

const styles = {
    default: 'text-white bg-black hover:bg-neutral-950 focus:ring-gray-300 focus:ring-0.5',
    secondary: 'text-gray-900 content-col border border-gray-300 hover:bg-neutral-100 focus:ring-0.5 focus:ring-gray-100 floatbox disabled:text-gray-400 disabled:bg-gray-100'
}

const sizes = {
    base: 'text-sm py-3 px-4',
    small: 'text-xs py-1.5 px-2'
}

export default function Button({ loading, className, children, buttonStyle = 'default', style, size = 'base', ...defaultProps }: ButtonProps) {
    let ButtonStyles =
        styles[buttonStyle] + ' ' + sizes[size] +
        " transition focus:outline-none focus:ring-0.5 " +
        "font-medium rounded-lg flex flex-row justify-center items-center";

    let propStyle = style ?? {};
    propStyle.position = 'relative';

    return (
        <button {...defaultProps} className={ButtonStyles + " " + (className ?? '')} style={propStyle}>
            {loading &&
                <div className="absolute right-3">
                    <Loader />
                </div>
            }

            {children}
        </button>
    );
}
