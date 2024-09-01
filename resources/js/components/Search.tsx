import React from 'react';

interface SearchProps extends React.AllHTMLAttributes<HTMLInputElement> {
}

export default function Search({ className, ...props }: SearchProps) {
    let inputStyle =
        "block w-full text-sm leading-5 " +
        "text-gray-900 bg-transparent " +
        "appearance-none focus:outline-none focus:ring-0 peer";

    return (
        <div className="w-auto flex flex-row items-center justify-center border-1 border-gray-300 border rounded-lg px-2 gap-2 h-9">
            <i className="fa-solid fa-magnifying-glass text-gray-600"></i>
            <input className={inputStyle} placeholder='Search...'/>
        </div>
    );
}
