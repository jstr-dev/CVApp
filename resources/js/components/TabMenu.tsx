import React, { ReactNode, useState } from 'react';

interface Tab {
    name: string;
    content: ReactNode;
}

interface TabMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    tabs: Tab[]
}

function TabMenu({ tabs, ...props }: TabMenuProps) {
    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <div {...props} className={"flex relative flex-col gap-6 " + props.className}>
            <div className={`absolute top-[28px] left-0 right-0 h-0.5 rounded-sm bg-gray-200 w-full`}></div>
            <div className="flex flex-row gap-4">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`relative text-sm font-semibold cursor-pointer px-1 ${currentTab === index ? 'text-blue-500' : 'text-gray-800'} transition-all ease-in-out delay-200`}
                        onClick={() => setCurrentTab(index)}
                    >
                        <div className={`${currentTab === index ? 'opacity-100' : 'opacity-0'} absolute bottom-[-10px] left-0 right-0 h-0.5 bg-blue-500 rounded-sm transition-all ease-in-out delay-200`}></div>
                        {tab.name}
                    </div>
                ))}
            </div>
            <div className={'mt-2'}>{tabs[currentTab].content}</div>
        </div>
    );
}

export default TabMenu;
export { Tab };
