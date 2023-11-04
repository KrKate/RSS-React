import React from 'react';
import SWimage from '../assets/SW.jpg';

export const ErrorComponent: React.FC = () => {
  return (
    <div className="error-wrapper">
      <h1>Error!!!!</h1>
      <img className="error-img" src={SWimage} />
    </div>
  );
};
