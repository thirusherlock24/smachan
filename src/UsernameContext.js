// UsernameContext.js
import React, { createContext, useState } from 'react';

const UsernameContext = createContext();
const PlanNameContext = createContext();

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const PlanNameProvider = ({ children }) => {
    const [planName, setPlanName] = useState('');
  
    return (
      <PlanNameContext.Provider value={{ planName, setPlanName }}>
        {children}
      </PlanNameContext.Provider>
    );
  };

export default UsernameContext;
