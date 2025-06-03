import React, { createContext, useEffect, useState } from 'react';

export const dataContext = createContext(null);

const Data = ({ children }) => {
  const defaultData = [
    { id: 1, description: "Complete the project documentation and submit it by EOD.", status: "Completed" },
    { id: 2, description: "Fix all bugs assigned in the issue tracker.", status: "In Progress" },
    { id: 3, description: "Design the UI mockups for the new landing page.", status: "Pending" },
  ];

  // Load from localStorage or fallback to defaultData
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('taskData');
    return stored ? JSON.parse(stored) : defaultData;
  });

  // Update localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('taskData', JSON.stringify(data));
  }, [data]);

  return (
    <dataContext.Provider value={{ data, setData }}>
      {children}
    </dataContext.Provider>
  );
};

export default Data;
