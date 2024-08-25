import React from "react";

export default function Search({className}: {className?: string}) {
    return (
        <div className={"w-full flex flex-row rounded-md px-1 pb-1 pt-1 border focus-within:ring-1 focus-within:ring-gray-400 " + className}>
            <i className="h-full fa-solid fa-magnifying-glass text-gray-400 text-xs mr-1.5 pr-1 pl-1"></i>
            <input type="text" placeholder="Search..." className="w-full content-col text-xs focus:outline-none" style={{transform: 'tranlateY(-10px)'}} />
        </div> 
    )
}