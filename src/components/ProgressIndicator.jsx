import React from 'react';

const ProgressIndicator = ({ steps, currentStep, onTabChange }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl relative py-2">
        {/* Contenedor flexible */}
        <div className="flex relative px-2">
          {/* Línea base */}
          <div 
            className="absolute h-0.5 bg-gray-300"
            style={{
              left: '32px',
              right: '32px',
              top: '10px'
            }}
          />
          
          {/* Línea de progreso */}
          <div 
            className="absolute h-0.5 bg-blue-600 transition-all duration-300"
            style={{
              left: '32px',
              width: `${(currentStep / (steps.length - 1)) * (100 - (64 / steps.length))}%`,
              top: '10px'
            }}
          />

          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="flex-1 flex flex-col items-center"
            >
              {/* Círculo */}
              <button
                onClick={() => onTabChange(index)}
                className={`z-10 w-5 h-5 rounded-full flex items-center justify-center font-bold text-white text-xs transition-colors duration-200 ${
                  index <= currentStep
                    ? "bg-blue-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors duration-200
                    ${index <= currentStep ? 'bg-white' : 'bg-transparent'}
                  `}
                />
              </button>
              
              {/* Etiqueta */}
              <span 
                className={`mt-2 text-[10px] sm:text-xs font-medium text-center max-w-[80px] ${
                  index === currentStep ? "text-blue-600 font-medium" : "text-gray-600"
                }`}
                style={{
                  wordWrap: 'break-word',
                  hyphens: 'auto'
                }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;