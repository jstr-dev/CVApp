import React from 'react';

export default function Error({ errorMessage }: { errorMessage?: string}) {
    return (
        <span className='text-red-500 mb-2 italic text-xs'>{errorMessage}</span>
    );
}