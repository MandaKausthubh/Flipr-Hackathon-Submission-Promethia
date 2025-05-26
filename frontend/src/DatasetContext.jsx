// DatasetContext.js
import { createContext, useContext, useState } from 'react';

const DatasetContext = createContext();

export const useDataset = () => useContext(DatasetContext);

export function DatasetProvider({ children }) {
  const [dataset, setDataset] = useState([]);

  return (
    <DatasetContext.Provider value={{ dataset, setDataset }}>
      {children}
    </DatasetContext.Provider>
  );
}
