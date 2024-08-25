import React from "react";

export default function Heading({ headingName }: { headingName: string }) {
    return (
        <h1 className="text-2xl font-semibold mb-6">{headingName}</h1>
    );
}