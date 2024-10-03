import React from "react";

export default function Tooltip({text} : {text: string}) {
    return (
        <div className="absolute text-xs left-2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white p-2 rounded-md">
            {text}
        </div>
    )
} 