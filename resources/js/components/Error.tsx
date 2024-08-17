import React from 'react';

interface ErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
    error: FormError
}

export default function Error({ error, ...props }: ErrorProps) {
    return (
        <span
            {...props}
            className={'text-xs text-red-600' + " " + props.className}
        >
            {error && error instanceof Array ?
                error.map((error, index) => <div className='mt-1'>{error}</div>)
            : error}
        </span>
    );
}
