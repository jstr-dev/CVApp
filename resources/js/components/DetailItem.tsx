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
        !isEditing ? (
            value && (
                <div className="flex flex-col mb-2">
                    <span className="font-medium text-gray-500 text-xs">{label}</span>
                    <span className="text-gray-900">{value}</span>
                </div>
            )
        ):
        (   
            <Input type={type}
                id={id}
                label={label}
                className= 'mb-3 mr-1'
                value={value || ''}
                required={true}
            />
        )
    );
}