import React from 'react';

const ProgressIndicator = ({ activeTab, totalTabs, tabLabels = ["Paso 1", "Paso 2", "Paso 3"] }) => {
  // Asegurarse de que tabLabels tenga al menos totalTabs elementos
  const labels = tabLabels && tabLabels.length >= totalTabs 
    ? tabLabels 
    : Array(totalTabs).fill().map((_, i) => `Paso ${i+1}`);

  return (
    <div className="progress-indicator flex items-center justify-center w-full py-4">
      <div className="flex relative w-full max-w-3xl justify-between">
        {/* Línea conectora entre círculos */}
        <div className="absolute top-1/4 left-0 h-px bg-gray-300 w-full" style={{ top: '25%' }}></div>
        
        {Array.from({ length: totalTabs }, (_, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            <div
              className={`step w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold text-white transition-all duration-300 ${
                index < activeTab
                  ? "bg-green-500"
                  : index === activeTab
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs text-center whitespace-nowrap ${
              index === activeTab ? "text-blue-600 font-medium" : "text-gray-600"
            }`}>
              {labels[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;