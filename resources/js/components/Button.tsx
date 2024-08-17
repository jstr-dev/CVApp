import React from 'react';
import Loader from './Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export default function Button(ButtonProps: ButtonProps) {

    let ButtonStyles =
        "min-w-[100px] text-white bg-gray-800 hover:bg-gray-900 " +
        "focus:outline-none focus:ring-0.5 focus:ring-gray-300 "+
        "font-medium rounded-lg text-sm py-2 flex flex-row justify-center items-center";

    return (
        <button onClick={ButtonProps.onClick} className={ ButtonStyles + " " + ButtonProps.className} type={ButtonProps.type}>
            {ButtonProps.isLoading && 
                <Loader />
            }

            {ButtonProps.children}
        </button>
    );
}