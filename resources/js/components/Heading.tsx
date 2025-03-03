import React from "react";

export default function Heading({ className, title }: { className?: string, title: string }) {
    return (
        <h1 className={className + ' text-xl font-semibold mb-6'}>{title}</h1>
    );
}
