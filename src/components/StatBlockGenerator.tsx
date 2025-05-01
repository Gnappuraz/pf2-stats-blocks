import React, { useState, useRef } from 'react';
import { useStatBlock } from '../context/StatBlockContext';
import StatBlockForm from './StatBlockForm';
import StatBlockPreview from './StatBlockPreview';
import SavedStatBlocks from './SavedStatBlocks';
import { Printer, Save, FileDown, FileUp } from 'lucide-react';
import html2canvas from 'html2canvas-pro';

const StatBlockGenerator: React.FC = () => {
  const { statBlock, saveStatBlock } = useStatBlock();
  const [showSaved, setShowSaved] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false
      });

      // Convert to PNG and download
      const link = document.createElement('a');
      link.download = `${statBlock.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  };

  const exportStatBlock = () => {
    const dataStr = JSON.stringify(statBlock, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `${statBlock.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importStatBlock = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const result = e.target?.result as string;
            const importedData = JSON.parse(result);
            const importEvent = new CustomEvent('import-stat-block', { detail: importedData });
            document.dispatchEvent(importEvent);
          } catch (error) {
            console.error('Error importing stat block:', error);
            alert('Invalid file format');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left side - Edit Form */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Edit</h2>
            <div className="flex space-x-2">
              <button
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={handlePrint}
                title="Export as PNG"
              >
                <Printer size={18} />
              </button>
              <button
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={saveStatBlock}
                title="Save"
              >
                <Save size={18} />
              </button>
              <button
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={exportStatBlock}
                title="Export"
              >
                <FileDown size={18} />
              </button>
              <button
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={importStatBlock}
                title="Import"
              >
                <FileUp size={18} />
              </button>
            </div>
          </div>
          <StatBlockForm />
        </div>

        <div className="relative">
          <button
            className="w-full bg-stone-200 hover:bg-stone-300 font-semibold py-3 rounded-lg transition-colors"
            onClick={() => setShowSaved(!showSaved)}
          >
            {showSaved ? 'Hide Saved Stat Blocks' : 'Show Saved Stat Blocks'}
          </button>
          
          {showSaved && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10">
              <SavedStatBlocks onClose={() => setShowSaved(false)} />
            </div>
          )}
        </div>
      </div>

      {/* Right side - Preview */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div ref={previewRef}>
            <StatBlockPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatBlockGenerator;