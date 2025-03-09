import React from "react";
import Input from '@/components/Input';

interface DetailItemProps extends React.AllHTMLAttributes<HTMLDivElement> {
    label: string;
    value?: string | number |undefined;
    isEditing?: boolean;
    type?: string;
    id?: string;
}

export default function DetailItem({ label, value, isEditing, type, id }: DetailItemProps) {
    return (
        value && (
            !isEditing ? (
                <div className="flex flex-col mb-2">
                    <span className="font-medium text-gray-500 text-xs">{label}</span>
                    <input type="text" className="text-gray-900" value={value} />
                </div>
            ):
            (   
                <Input type={type}
                    id={id}
                    label={label}
                    className= 'mb-3 w-1/2'
                    value={value}
                    required={true}
                />
            )
        )
    );
}