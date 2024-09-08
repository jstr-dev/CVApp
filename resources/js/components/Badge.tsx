import React from 'react';

export interface BadgeProps extends React.AllHTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    styleName: 'neutral' | 'success' | 'danger'
}

const styles = {
    'neutral': 'bg-neutral-200 text-neutral-500',
    'success': 'bg-green-100 text-green-500',
    'danger': 'bg-red-100 text-red-500',
}

export default function Label({ children, styleName, ...props }: BadgeProps) {
    return (
        <div className={'leading-0 flex justify-center items-center pt-0.5 pb-1 px-3 rounded-full text-xs font-semibold ' + styles[styleName]} style={{ width: 'fit-content' }} {...props}>
            {children}
        </div>
    );
}
