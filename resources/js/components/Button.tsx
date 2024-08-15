import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    className?: string;
    isLoading?: boolean;
}

export default function Button(ButtonProps: ButtonProps) {
    return (
        <button onClick={ButtonProps.onClick} className={"min-w-[100px] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-0.5 focus:ring-gray-300 font-medium rounded-lg text-sm py-2 flex flex-row justify-center items-center" + " " + ButtonProps.className} type={ButtonProps.type}>
            {ButtonProps.isLoading && 
                <svg className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            }

            {ButtonProps.children}
        </button>
    );
}