import React from "react";

export default function Heading({ title }: { title: string }) {
    return (
        <h1 className="text-xl font-semibold mb-6">{title}</h1>
    );
}
