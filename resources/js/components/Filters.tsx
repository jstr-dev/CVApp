import React from "react";
import Button from "./Button";
import PopupBox from "./PopupBox";

interface FilterProps {
    children: React.ReactNode
}

interface FilterItemProps extends React.AllHTMLAttributes<HTMLDivElement> {
    key: string
}

export default function Filters({ children }: FilterProps) {
    const [visible, setVisible] = React.useState(false);

    return (
        <div className="w-auto relative">
            <Button buttonStyle="secondary" size="regular" icon="fa-bars" textClass='max-sm:hidden' onClick={() => setVisible(!visible)}>Filters</Button>

            <PopupBox maxHeight={400} minWidth={200} align='right' visible={visible}>
                {children}
            </PopupBox>
        </div>
    )
}

export function CheckFilter({ key, children }: FilterItemProps) {
    return (
        <div className="flex flex-row gap-2 items-center">
            <input type="checkbox" id={key} />
            <label htmlFor={key} className="text-xs">{children}</label>
        </div>
    )
}

export function FilterList({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-xs text-gray-800 font-bold">{title}</div>
            {children}
        </div>
    )
}
