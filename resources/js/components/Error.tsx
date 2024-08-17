import React from 'react';

interface ErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    errorMessage: string
}

export default function Error(props: ErrorProps) {
    return (
        <span
            {...props}
            className={'text-xs text-red-600' + " " + props.className}
        >
            {props.errorMessage}
        </span>
    );
}
