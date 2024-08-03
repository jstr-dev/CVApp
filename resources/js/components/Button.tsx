import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export default function Button(ButtonProps: ButtonProps) {
    return (
        <div>
            <button onClick={ButtonProps.onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">{ButtonProps.children}</button>
        </div>
    );
}