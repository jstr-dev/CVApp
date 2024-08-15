import React, { ChangeEventHandler } from 'react';
import Error from './Error';

export default function Input({ className, type, placeholder, onChange, error, errorMessage }: { className?: string, type: string, placeholder?: string, onChange?: ChangeEventHandler<HTMLInputElement>, error?: boolean, errorMessage?: string }) {
    return (
        <>
            <input 
                type={type} 
                placeholder={placeholder} 
                onChange={onChange}
                className={"mt-1 block w-full px-3 py-2 bg-white rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-0.5 focus:ring-sky-500 " + (error ? "border border-red-500" : "border border-slate-300") + " " + className}
            />
            {error && <Error errorMessage={errorMessage} />}
        </>
    );
}