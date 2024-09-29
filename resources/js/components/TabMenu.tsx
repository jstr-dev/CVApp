import React, { ReactNode, useState } from 'react';

interface Tab {
    name: string;
    content: ReactNode;
}

function TabMenu({ tabs }: { tabs: Tab[] }) {
    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-6">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`tab ${currentTab === index ? 'active' : ''}`}
                        onClick={() => setCurrentTab(index)}
                    >
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