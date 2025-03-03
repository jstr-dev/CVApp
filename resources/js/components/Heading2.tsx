import React from "react";

export default function Heading({ title }: { title: string }) {
    return (
        <h1 className="text-large font-medium mb-6">{title}</h1>
    );
}
