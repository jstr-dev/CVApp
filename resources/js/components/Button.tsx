import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export default function Button(ButtonProps: ButtonProps) {
    return (
        <button onClick={ButtonProps.onClick} className="primary">{ButtonProps.children}</button>
    );
}