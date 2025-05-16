import { useState } from "react";

const Tabs = ({ children, activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="tab-container flex border-b border-gray-200 bg-white">
        {children.map((child, index) => (
          <button
            key={index}
            className={`tab px-6 py-4 font-semibold text-center flex-1 transition-all duration-300 ease-in-out ${
              activeTab === index
                ? "bg-white text-blue-600 border-b-2 border-blue-600"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content bg-white transition-opacity duration-500 ease-in-out">
        {children[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;