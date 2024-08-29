import React from 'react';
import Loader from './Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    buttonStyle?: 'default' | 'secondary' | 'primary';
    size?: 'base' | 'small' | 'regular';
    icon?: string;
}

const styles = {
    primary: 'text-white primary-col hover:bg-blue-500 focus:ring-blue-300 focus:ring-0.5',
    default: 'text-white bg-black hover:bg-neutral-950 focus:ring-gray-300 focus:ring-0.5',
    secondary: 'text-gray-900 content-col border border-gray-300 hover:bg-neutral-100 focus:ring-0.5 focus:ring-gray-100 disabled:text-gray-400 disabled:bg-gray-100'
}

const sizes = {
    base: 'text-sm py-3 px-4',
    regular: 'text-sm py-2 px-4 leading-5',
    small: 'text-xs py-1.5 px-2'
}

export default function Button({ loading, className, children, buttonStyle = 'default', style, size = 'base', icon, ...defaultProps }: ButtonProps) {
    let ButtonStyles =
        styles[buttonStyle] + ' ' + sizes[size] +
        " transition focus:outline-none focus:ring-0.5 " +
        "font-semibold rounded-lg flex flex-row justify-center items-center";

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
                <i className={'mr-2 fa-solid ' + icon} />
            }

            <div className={'translate-y-[-0.5px]'}>{children}</div>
        </button>
    );
}
