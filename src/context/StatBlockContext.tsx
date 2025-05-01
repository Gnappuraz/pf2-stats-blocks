import React, { createContext, useContext, useState, useEffect } from 'react';
import { StatBlock, defaultStatBlock } from '../types';

interface StatBlockContextType {
  statBlock: StatBlock;
  updateStatBlock: (update: Partial<StatBlock>) => void;
  updateNestedField: (path: string, value: any) => void;
  resetStatBlock: () => void;
  saveStatBlock: () => void;
  loadStatBlock: (savedData: StatBlock) => void;
  savedStatBlocks: StatBlock[];
}

const StatBlockContext = createContext<StatBlockContextType | undefined>(undefined);

export function StatBlockProvider({ children }: { children: React.ReactNode }) {
  const [statBlock, setStatBlock] = useState<StatBlock>({ ...defaultStatBlock });
  const [savedStatBlocks, setSavedStatBlocks] = useState<StatBlock[]>([]);

  useEffect(() => {
    const handleImport = (event: CustomEvent<StatBlock>) => {
      setStatBlock(event.detail);
    };

    document.addEventListener('import-stat-block' as any, handleImport as any);

    return () => {
      document.removeEventListener('import-stat-block' as any, handleImport as any);
    };
  }, []);

  const updateStatBlock = (update: Partial<StatBlock>) => {
    setStatBlock(current => ({ ...current, ...update }));
  };

  const updateNestedField = (path: string, value: any) => {
    const keys = path.split('.');
    setStatBlock(current => {
      let result = { ...current };
      let pointer: any = result;
      for (let i = 0; i < keys.length - 1; i++) {
        if (Array.isArray(pointer[keys[i]])) {
          pointer[keys[i]] = [...pointer[keys[i]]];
        } else {
          pointer[keys[i]] = { ...pointer[keys[i]] };
        }
        pointer = pointer[keys[i]];
      }
      pointer[keys[keys.length - 1]] = value;
      return result;
    });
  };

  const resetStatBlock = () => {
    setStatBlock({ ...defaultStatBlock });
  };

  const saveStatBlock = () => {
    setSavedStatBlocks(current => {
      const exists = current.findIndex(sb => sb.name === statBlock.name);
      if (exists >= 0) {
        const updated = [...current];
        updated[exists] = { ...statBlock };
        return updated;
      }
      return [...current, { ...statBlock }];
    });
  };

  const loadStatBlock = (savedData: StatBlock) => {
    setStatBlock(savedData);
  };

  return (
    <StatBlockContext.Provider
      value={{
        statBlock,
        updateStatBlock,
        updateNestedField,
        resetStatBlock,
        saveStatBlock,
        loadStatBlock,
        savedStatBlocks
      }}
    >
      {children}
    </StatBlockContext.Provider>
  );
}

export function useStatBlock() {
  const context = useContext(StatBlockContext);
  if (context === undefined) {
    throw new Error('useStatBlock must be used within a StatBlockProvider');
  }
  return context;
}