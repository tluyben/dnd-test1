import * as React from "react";
import clsx from "clsx";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={clsx(
            "px-4 py-2 -mb-px text-sm font-medium text-center whitespace-nowrap focus:outline-none",
            activeTab === tab
              ? "border-b-2 border-blue-500 text-blue-600"
              : "border-b-2 border-transparent text-gray-600 hover:text-gray-800"
          )}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
