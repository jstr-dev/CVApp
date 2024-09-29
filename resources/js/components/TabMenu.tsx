import React, { ReactNode, useState } from 'react';

interface Tab {
    name: string;
    content: ReactNode;
}

function TabMenu({ tabs }: { tabs: Tab[] }) {
    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`relative text-sm font-semibold cursor-pointer px-1 ${currentTab === index ? 'text-blue-500' : 'text-gray-800'}`}
                        onClick={() => setCurrentTab(index)}
                    >
                        <div className={`${currentTab !== index && 'opacity-0'} absolute bottom-[-10px] left-0 right-0 h-0.5 bg-blue-500 rounded-sm`}></div>
                        {tab.name}
                    </div>
                ))}
            </div>
            <div>{tabs[currentTab].content}</div>
        </div>
    );
}

export default TabMenu;
export { Tab };