import React from 'react';
import { useStatBlock } from '../context/StatBlockContext';
import { Trash2 } from 'lucide-react';

const SavedStatBlocks: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { savedStatBlocks, loadStatBlock } = useStatBlock();

  const handleLoad = (index: number) => {
    loadStatBlock(savedStatBlocks[index]);
    onClose();
  };

  if (savedStatBlocks.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No saved stat blocks yet.</p>
        <p className="text-gray-500 text-sm mt-2">Create and save a stat block to see it here.</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Saved Stat Blocks</h3>
      <div className="space-y-2">
        {savedStatBlocks.map((statBlock, index) => (
          <div
            key={index}
            className="p-3 bg-stone-100 rounded-md hover:bg-stone-200 transition-colors cursor-pointer flex justify-between items-center"
            onClick={() => handleLoad(index)}
          >
            <div>
              <div className="font-medium">{statBlock.name}</div>
              <div className="text-sm text-gray-600">
                Level {statBlock.level} {statBlock.size} {statBlock.traits.join(', ')}
              </div>
            </div>
            <button
              className="p-1 text-red-600 hover:bg-red-100 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                // Here you would implement delete functionality
                // For now we're just showing the button
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SavedStatBlocks;