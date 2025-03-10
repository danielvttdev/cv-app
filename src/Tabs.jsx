import { useState } from "react";

const Tabs = ({ children, activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="tab-container flex overflow-x-auto bg-gray-100 border-b border-gray-200">
        {children.map((child, index) => (
          <button
            key={index}
            className={`tab px-4 py-3 font-semibold text-gray-600 transition-all duration-300 ease-in-out ${
              activeTab === index
                ? "bg-white text-blue-600 border-b-4 border-blue-600"
                : "hover:bg-gray-200 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content p-6 transition-opacity duration-500 ease-in-out">
        {children[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;