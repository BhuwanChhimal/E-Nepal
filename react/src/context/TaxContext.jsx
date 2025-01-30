import { createContext, useState } from 'react';

export const TaxContext = createContext();

export const TaxProvider = ({ children }) => {
  const [income, setIncome] = useState(0);

  const [deductions, setDeductions] = useState(0);


  return (
    <TaxContext.Provider value={{ income, setIncome, deductions, setDeductions }}>
      {children}
    </TaxContext.Provider>
  );
};