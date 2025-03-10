const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max px-4" aria-label="Tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(index)}
            className={`
              whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm
              ${
                activeTab === index
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              transition-colors duration-200
            `}
            aria-current={activeTab === index ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs; 