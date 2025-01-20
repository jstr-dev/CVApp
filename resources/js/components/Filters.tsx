import React, { useEffect } from "react";
import Button from "./Button";
import PopupBox from "./PopupBox";
import Checkbox from "./Checkbox";

interface FilterProps {
    children: React.ReactNode
}

interface FilterItemProps extends React.AllHTMLAttributes<HTMLDivElement> {
    filterKey: string
}

export default function Filters({ children }: FilterProps) {
    const [visible, setVisible] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    // Invisible when they click off it
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setVisible(false);
            }
        }

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    })

    return (
        <div className="w-auto relative" ref={ref}>
            <Button buttonStyle="secondary" size="regular" icon="fa-bars" textClass='max-sm:hidden' onClick={() => setVisible(!visible)}>Filters</Button>

            <PopupBox maxHeight={400} minWidth={200} align='right' visible={visible}>
                {children}

                <div className="flex flex-row-reverse">
                    <Button buttonStyle="secondary" size="small">Reset</Button>
                </div>
            </PopupBox>
        </div>
    )
}

export function CheckFilter({ filterKey, children }: FilterItemProps) {
    return (
        <div className="flex flex-row gap-2 items-center">
            <Checkbox type="checkbox" id={filterKey} />
            <label htmlFor={filterKey} className="text-xs">{children}</label>
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
