import React, { ChangeEventHandler } from 'react';

export default function Input({ className, type, placeholder, onChange }: { className?: string, type: string, placeholder?: string, onChange?: ChangeEventHandler<HTMLInputElement> }) {
    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            onChange={onChange}
            className={"mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-0.5 focus:ring-sky-500" + " " + className}
        />
    );
}