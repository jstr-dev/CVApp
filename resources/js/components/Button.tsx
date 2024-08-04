import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    className?: string;
}

export default function Button(ButtonProps: ButtonProps) {
    return (
        <button onClick={ButtonProps.onClick} className={"min-w-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" + "" + ButtonProps.className} type={ButtonProps.type}>{ButtonProps.children}</button>
    );
}