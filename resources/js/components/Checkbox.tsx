import React from 'react';

interface CheckboxProps extends React.AllHTMLAttributes<HTMLInputElement> {
}

const styles = `
    checkbox
    w-4
    h-4
    rounded
    border
    border-1
`;

export default function Checkbox({ ...props }: CheckboxProps) {
    return (
        <input type="checkbox" className={styles} {...props} />
    )
}
