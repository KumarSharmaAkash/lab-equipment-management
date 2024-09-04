import React from 'react';
import './Alert.css';

interface AlertProps {
  message: string | null;
  type: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  if (!message) return null;

  return (
    <div>
      {type === 'error' && (
        <div role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 mt-8">
            Failed to upload
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{message}</p>
          </div>
        </div>
      )}
      {type === 'success' && (
        <div className="flex items-center mt-8 rounded bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
          
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
