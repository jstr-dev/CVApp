import React, { useMemo } from 'react';
import Loader from './Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    buttonStyle?: 'default' | 'secondary' | 'primary' | 'accordion';
    size?: 'base' | 'small' | 'regular';
    icon?: string;
    textClass?: string;
}

const styles = {
    primary: 'text-white primary-col primary-button focus:ring-blue-300 focus:ring-0.5',
    default: 'text-white bg-black hover:bg-neutral-950 focus:ring-gray-300 focus:ring-0.5',
    secondary: 'text-gray-900 content-col border border-gray-300 hover:bg-neutral-100 focus:ring-0.5 focus:ring-gray-100 disabled:text-gray-400 disabled:bg-gray-100',
    accordion: 'text-gray-900 content-col hover:text-gray-500 focus:ring-0.5 focus:ring-gray-100 disabled:text-gray-400 disabled:bg-gray-100'
}

const sizes = {
    base: 'text-sm px-4 h-10',
    regular: 'text-sm px-4 leading-5 h-9',
    small: 'text-xs px-2 h-7'
}

export default function Button({ loading, className, children, buttonStyle = 'default', style, size = 'base', icon, textClass, ...defaultProps }: ButtonProps) {
    let ButtonStyles =
        styles[buttonStyle] + ' ' + sizes[size] +
        " transition focus:outline-none focus:ring-0.5 " +
        "font-semibold rounded-lg flex flex-row justify-center items-center flex gap-2";

    let propStyle = style ?? {};
    propStyle.position = 'relative';

    return (
        <button {...defaultProps} className={ButtonStyles + " " + (className ?? '')} style={propStyle}>
            {loading &&
                <div className="absolute right-3">
                    <Loader />
                </div>
            }

            {icon &&
                <i className={'fa-solid ' + icon} />
            }

            <div className={textClass + (children === undefined ? ' hidden' : '')}>{children}</div>
        </button>
    );
}
