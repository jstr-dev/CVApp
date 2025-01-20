import React from 'react';

interface PopupBoxProps {
    children: React.ReactNode
    minHeight?: number;
    maxHeight?: number
    minWidth?: number
    maxWidth?: number
    align?: 'left' | 'right'
    visible?: boolean
    zIndex?: number
}

export default function PopupBox({ children, maxHeight, minHeight, maxWidth, minWidth, align, visible, zIndex }: PopupBoxProps) {
    const style: React.CSSProperties = {
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        minHeight: minHeight ? `${minHeight}px` : undefined,
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        minWidth: minWidth ? `${minWidth}px` : undefined,
        left: align === 'left' ? '0' : undefined,
        right: align === 'right' ? '0' : undefined,
        display: visible ? 'block' : 'none',
        zIndex: zIndex ? zIndex : 200
    };

    return (
        <div className={'flex flex-col p-4 content-col absolute border border-3 mt-1 rounded-md floatbox'} style={style}>
            {children}
        </div>
    )
}

