import React from 'react';

interface CheckboxProps extends React.AllHTMLAttributes<HTMLInputElement> {
}

const styles = `
    w-4
    h-4
    text-blue-600
    bg-gray-100
    rounded
    border
    border-1
    focus:ring-blue
    focus:ring-0.5
`;

export default function Checkbox({ ...props }: CheckboxProps) {
    return (
        <input type="checkbox" className={styles} {...props} />
    )
}
