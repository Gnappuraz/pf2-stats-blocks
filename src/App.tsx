import React from 'react';
import { Shield } from 'lucide-react';
import StatBlockGenerator from './components/StatBlockGenerator';
import { StatBlockProvider } from './context/StatBlockContext';

function App() {
  return (
    <StatBlockProvider>
      <div className="min-h-screen bg-stone-100">
        <header className="bg-red-900 text-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center">
            <Shield className="w-8 h-8 mr-3" />
            <h1 className="text-2xl font-bold">Pathfinder 2e Stat Block Generator</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <StatBlockGenerator />
        </main>
        <footer className="bg-stone-800 text-stone-300 py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              This is an unofficial Pathfinder 2e tool. Pathfinder and associated marks are trademarks of Paizo Inc.
            </p>
            <p className="text-xs mt-2">
              Created for tabletop gaming enthusiasts. Not affiliated with Paizo Inc.
            </p>
          </div>
        </footer>
      </div>
    </StatBlockProvider>
  );
}

export default App;