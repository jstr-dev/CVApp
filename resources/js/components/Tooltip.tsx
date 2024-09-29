import React from "react";

export default function Tooltip({text} : {text: string}) {
    return (
        <div className="absolute left-2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded">
            {text}
        </div>
    )
} 