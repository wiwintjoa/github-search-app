// src/components/Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-purple-500 border-opacity-50"></div>
    </div>
  );
};

export default Spinner;