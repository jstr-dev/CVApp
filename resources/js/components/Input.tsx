import React, { ChangeEventHandler } from 'react';
import Error from './Error';

export default function Input({ className, type, label, onChange, error, errorMessage, id }: { className?: string, type: string, label?: string, onChange?: ChangeEventHandler<HTMLInputElement>, error?: boolean, errorMessage?: string, id?: string }) {
    return (
        <>
            <div className='relative'>
                <input 
                    id={id}
                    type={type} 
                    placeholder=' ' 
                    onChange={onChange}
                    className={"mt-1 block w-full px-3 py-2 bg-white rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-0.5 focus:ring-violet-600 peer " + (error ? "border border-red-500" : "border border-slate-300") + " " + className}
                />
                <label htmlFor={id} className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{label}</label>
            </div>          
            {error && <Error errorMessage={errorMessage} />}
        </>
    );
}