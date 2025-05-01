import React from 'react';
import { useStatBlock } from '../context/StatBlockContext';
import { Plus, Trash2 } from 'lucide-react';

const StatBlockForm: React.FC = () => {
  const { statBlock, updateStatBlock, updateNestedField, resetStatBlock } = useStatBlock();

  const addSkill = () => {
    const skillName = prompt('Enter skill name:');
    if (skillName && !statBlock.skills[skillName]) {
      const skillValue = parseInt(prompt('Enter skill modifier:', '0') || '0');
      updateNestedField('skills', { ...statBlock.skills, [skillName]: skillValue });
    }
  };

  const removeSkill = (skillName: string) => {
    const newSkills = { ...statBlock.skills };
    delete newSkills[skillName];
    updateNestedField('skills', newSkills);
  };

  const addMeleeAttack = () => {
    updateNestedField('attacks.melee', [
      ...statBlock.attacks.melee,
      { name: 'New Attack', bonus: 0, damage: '1d6', traits: [] }
    ]);
  };

  const removeMeleeAttack = (index: number) => {
    updateNestedField(
      'attacks.melee',
      statBlock.attacks.melee.filter((_, i) => i !== index)
    );
  };

  const addRangedAttack = () => {
    updateNestedField('attacks.ranged', [
      ...statBlock.attacks.ranged,
      { name: 'New Ranged Attack', bonus: 0, damage: '1d6', range: 30, traits: [] }
    ]);
  };

  const removeRangedAttack = (index: number) => {
    updateNestedField(
      'attacks.ranged',
      statBlock.attacks.ranged.filter((_, i) => i !== index)
    );
  };

  const addAbility = () => {
    updateNestedField('abilities', [
      ...statBlock.abilities,
      { name: 'New Ability', description: 'Describe the ability here.' }
    ]);
  };

  const removeAbility = (index: number) => {
    updateNestedField(
      'abilities',
      statBlock.abilities.filter((_, i) => i !== index)
    );
  };

  const addAction = () => {
    updateNestedField('actions', [
      ...statBlock.actions,
      { name: 'New Action', actionType: 'one', description: 'Describe the action here.' }
    ]);
  };

  const removeAction = (index: number) => {
    updateNestedField(
      'actions',
      statBlock.actions.filter((_, i) => i !== index)
    );
  };

  const addTrait = () => {
    const trait = prompt('Enter trait:');
    if (trait && !statBlock.traits.includes(trait)) {
      updateNestedField('traits', [...statBlock.traits, trait]);
    }
  };

  const removeTrait = (index: number) => {
    updateNestedField(
      'traits',
      statBlock.traits.filter((_, i) => i !== index)
    );
  };

  const addInteractionAbility = () => {
    updateNestedField('interactionAbilities', [
      ...statBlock.interactionAbilities,
      { name: 'New Interaction Ability', description: 'Describe the interaction ability here.' }
    ]);
  };

  const removeInteractionAbility = (index: number) => {
    updateNestedField(
      'interactionAbilities',
      statBlock.interactionAbilities.filter((_, i) => i !== index)
    );
  };

  const addAutomaticAbility = () => {
    updateNestedField('automaticAbilities', [
      ...statBlock.automaticAbilities,
      { name: 'New Automatic Ability', description: 'Describe the automatic ability here.' }
    ]);
  };

  const removeAutomaticAbility = (index: number) => {
    updateNestedField(
      'automaticAbilities',
      statBlock.automaticAbilities.filter((_, i) => i !== index)
    );
  };

  const addReactiveAbility = () => {
    updateNestedField('reactiveAbilities', [
      ...statBlock.reactiveAbilities,
      { name: 'New Reactive Ability', description: 'Describe the reactive ability here.' }
    ]);
  };

  const removeReactiveAbility = (index: number) => {
    updateNestedField(
      'reactiveAbilities',
      statBlock.reactiveAbilities.filter((_, i) => i !== index)
    );
  };

  const addSpellLevel = (type: 'innate' | 'focus' | 'rituals' | 'prepared') => {
    updateNestedField(`spells.${type}`, [
      ...(statBlock.spells[type] || []),
      {
        level: 1,
        spells: [],
        atWill: false
      }
    ]);
  };

  const removeSpellLevel = (type: 'innate' | 'focus' | 'rituals' | 'prepared', index: number) => {
    updateNestedField(
      `spells.${type}`,
      (statBlock.spells[type] || []).filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={statBlock.name}
            onChange={(e) => updateStatBlock({ name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <input
            type="number"
            value={statBlock.level}
            onChange={(e) => updateStatBlock({ level: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rarity</label>
          <select
            value={statBlock.rarity}
            onChange={(e) => updateStatBlock({ rarity: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="unique">Unique</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
          <input
            type="text"
            value={statBlock.alignment}
            onChange={(e) => updateStatBlock({ alignment: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
          <select
            value={statBlock.size}
            onChange={(e) => updateStatBlock({ size: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="tiny">Tiny</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
            <option value="gargantuan">Gargantuan</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Traits</label>
          <button 
            onClick={addTrait}
            className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
          >
            <Plus size={14} className="mr-1" /> Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {statBlock.traits.map((trait, index) => (
            <div key={index} className="bg-stone-100 px-2 py-1 rounded-md flex items-center">
              <span className="mr-2">{trait}</span>
              <button onClick={() => removeTrait(index)} className="text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Perception</label>
          <input
            type="text"
            value={statBlock.perception}
            onChange={(e) => updateStatBlock({ perception: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
          <input
            type="text"
            value={statBlock.languages.join(', ')}
            onChange={(e) => updateStatBlock({ languages: e.target.value.split(',').map(l => l.trim()) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Ability Modifiers</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {Object.entries(statBlock.abilityScores).map(([ability, modifier]) => (
            <div key={ability}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {ability}
              </label>
              <div className="flex">
                <input
                  type="number"
                  value={modifier}
                  onChange={(e) => 
                    updateNestedField(
                      `abilityScores.${ability}`, 
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Skills</h3>
          <button 
            onClick={addSkill}
            className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
          >
            <Plus size={14} className="mr-1" /> Add Skill
          </button>
        </div>
        <div className="space-y-2">
          {Object.entries(statBlock.skills).map(([skill, modifier]) => (
            <div key={skill} className="flex items-center">
              <input
                type="text"
                value={skill}
                readOnly
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
              />
              <input
                type="number"
                value={modifier}
                onChange={(e) => 
                  updateNestedField(
                    `skills.${skill}`, 
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-1/3 px-3 py-2 border-y border-r border-gray-300"
              />
              <button 
                onClick={() => removeSkill(skill)}
                className="px-3 py-2 bg-red-100 text-red-700 border border-l-0 border-gray-300 rounded-r-md"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Interaction Abilities</h3>
          <button 
            onClick={addInteractionAbility}
            className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
          >
            <Plus size={14} className="mr-1" /> Add Ability
          </button>
        </div>
        
        {statBlock.interactionAbilities.map((ability, index) => (
          <div key={index} className="mb-4 p-3 bg-stone-50 rounded-md">
            <div className="flex justify-between mb-2">
              <h4 className="font-medium">Interaction Ability {index + 1}</h4>
              <button 
                onClick={() => removeInteractionAbility(index)}
                className="text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={ability.name}
                onChange={(e) => 
                  updateNestedField(
                    `interactionAbilities.${index}.name`, 
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={ability.description}
                onChange={(e) => 
                  updateNestedField(
                    `interactionAbilities.${index}.description`, 
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold">Items</h3>
        <textarea
          value={statBlock.items}
          onChange={(e) => updateStatBlock({ items: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">AC</label>
          <input
            type="number"
            value={statBlock.ac}
            onChange={(e) => updateStatBlock({ ac: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fortitude</label>
          <input
            type="number"
            value={statBlock.savingThrows.fortitude}
            onChange={(e) => 
              updateNestedField(
                'savingThrows.fortitude', 
                parseInt(e.target.value) || 0
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reflex</label>
          <input
            type="number"
            value={statBlock.savingThrows.reflex}
            onChange={(e) => 
              updateNestedField(
                'savingThrows.reflex', 
                parseInt(e.target.value) || 0
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Will</label>
          <input
            type="number"
            value={statBlock.savingThrows.will}
            onChange={(e) => 
              updateNestedField(
                'savingThrows.will', 
                parseInt(e.target.value) || 0
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">HP</label>
          <input
            type="number"
            value={statBlock.hp}
            onChange={(e) => updateStatBlock({ hp: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Immunities</label>
          <input
            type="text"
            value={statBlock.immunities.join(', ')}
            onChange={(e) => updateStatBlock({ immunities: e.target.value ? e.target.value.split(',').map(s => s.trim()) : [] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resistances</label>
          <input
            type="text"
            value={statBlock.resistances.join(', ')}
            onChange={(e) => updateStatBlock({ resistances: e.target.value ? e.target.value.split(',').map(s => s.trim()) : [] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weaknesses</label>
          <input
            type="text"
            value={statBlock.weaknesses.join(', ')}
            onChange={(e) => updateStatBlock({ weaknesses: e.target.value ? e.target.value.split(',').map(s => s.trim()) : [] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Speed</label>
          <input
            type="text"
            value={statBlock.speed}
            onChange={(e) => updateStatBlock({ speed: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="25 feet, fly 30 feet"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Automatic Abilities</h3>
          <button 
            onClick={addAutomaticAbility}
            className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
          >
            <Plus size={14} className="mr-1" /> Add Ability
          </button>
        </div>
        {statBlock.automaticAbilities.map((ability, index) => (
          <div key={index} className="mb-4 p-3 bg-stone-50 rounded-md">
            <div className="flex justify-between mb-2">
              <h4 className="font-medium">Automatic Ability {index + 1}</h4>
              <button 
                onClick={() => removeAutomaticAbility(index)}
                className="text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={ability.name}
                onChange={(e) => 
                  updateNestedField(
                    `automaticAbilities.${index}.name`, 
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={ability.description}
                onChange={(e) => 
                  updateNestedField(
                    `automaticAbilities.${index}.description`, 
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Reactive Abilities</h3>
          <button 
            onClick={addReactiveAbility}
            className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
          >
            <Plus size={14} className="mr-1" /> Add Ability
          </button>
        </div>
        {statBlock.reactiveAbilities.map((ability, index) => (
          <div key={index} className="mb-4 p-3 bg-stone-50 rounded-md">
            <div className="flex justify-between mb-2">
              <h4 className="font-medium">Reactive Ability {index + 1}</h4>
              <button 
                onClick={() => removeReactiveAbility(index)}
                className="text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={ability.name}
                onChange={(e) => 
                  updateNestedField(
                    `reactiveAbilities.${index}.name`, 
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={ability.description}
                onChange={(e) => 
                  updateNestedField(
                    `reactiveAbilities.${index}.description`, 
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Melee Attacks</h3>
          <button 
            onClick={addMeleeAttack}
            className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
          >
            <Plus size={14} className="mr-1" /> Add Attack
          </button>
        </div>
        {statBlock.attacks.melee.map((attack, index) => (
          <div key={index} className="mb-4 p-3 bg-stone-50 rounded-md">
            <div className="flex justify-between mb-2">
              <h4 className="font-medium">Melee Attack {index + 1}</h4>
              <button 
                onClick={() => removeMeleeAttack(index)}
                className="text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={attack.name}
                  onChange={(e) => 
                    updateNestedField(
                      `attacks.melee.${index}.name`, 
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Attack Bonus</label>
                <input
                  type="number"
                  value={attack.bonus}
                  onChange={(e) => 
                    updateNestedField(
                      `attacks.melee.${index}.bonus`, 
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Damage</label>
              <input
                type="text"
                value={attack.damage}
                onChange={(e) => 
                  updateNestedField(
                    `attacks.melee.${index}.damage`, 
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Traits</label>
              <input
                type="text"
                value={attack.traits.join(', ')}
                onChange={(e) => 
                  updateNestedField(
                    `attacks.melee.${index}.traits`, 
                    e.target.value ? e.target.value.split(',').map(s => s.trim()) : []
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Ranged Attacks</h3>
          <button 
            onClick={addRangedAttack}
            className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
          >
            <Plus size={14} className="mr-1" /> Add Attack
          </button>
        </div>
        {statBlock.attacks.ranged.map((attack, index) => (
          <div key={index} className="mb-4 p-3 bg-stone-50 rounded-md">
            <div className="flex justify-between mb-2">
              <h4 className="font-medium">Ranged Attack {index + 1}</h4>
              <button 
                onClick={() => removeRangedAttack(index)}
                className="text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={attack.name}
                  onChange={(e) => 
                    updateNestedField(
                      `attacks.ranged.${index}.name`, 
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Attack Bonus</label>
                <input
                  type="number"
                  value={attack.bonus}
                  onChange={(e) => 
                    updateNestedField(
                      `attacks.ranged.${index}.bonus`, 
                      parseInt(e.target.value) || 
                      0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Damage</label>
                <input
                  type="text"
                  value={attack.damage}
                  onChange={(e) => 
                    updateNestedField(
                      `attacks.ranged.${index}.damage`, 
                      e.target.value
                    )
                  }
                
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Range (feet)</label>
                <input
                  type="number"
                  value={attack.range}
                  onChange={(e) => 
                    updateNestedField(
                      `attacks.ranged.${index}.range`, 
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Traits</label>
              <input
                type="text"
                value={attack.traits.join(', ')}
                onChange={(e) => 
                  updateNestedField(
                    `attacks.ranged.${index}.traits`, 
                    e.target.value ? e.target.value.split(',').map(s => s.trim()) : []
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Spells</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => addSpellLevel('innate')}
              className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
            >
              <Plus size={14} className="mr-1" /> Add Innate
            </button>
            <button 
              onClick={() => addSpellLevel('focus')}
              className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
            >
              <Plus size={14} className="mr-1" /> Add Focus
            </button>
            <button 
              onClick={() => addSpellLevel('rituals')}
              className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
            >
              <Plus size={14} className="mr-1" /> Add Ritual
            </button>
            <button 
              onClick={() => addSpellLevel('prepared')}
              className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
            >
              <Plus size={14} className="mr-1" /> Add Prepared
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tradition</label>
            <select
              value={statBlock.spells.tradition || ''}
              onChange={(e) => updateNestedField('spells.tradition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">None</option>
              <option value="arcane">Arcane</option>
              <option value="divine">Divine</option>
              <option value="occult">Occult</option>
              <option value="primal">Primal</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Spell DC</label>
            <input
              type="number"
              value={statBlock.spells.dc || ''}
              onChange={(e) => updateNestedField('spells.dc', parseInt(e.target.value) || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Attack Bonus</label>
            <input
              type="number"
              value={statBlock.spells.attack || ''}
              onChange={(e) => updateNestedField('spells.attack', parseInt(e.target.value) || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {['innate', 'focus', 'rituals', 'prepared'].map((type) => (
          statBlock.spells[type as keyof typeof statBlock.spells]?.length > 0 && (
            <div key={type} className="mb-4">
              <h4 className="font-medium capitalize mb-2">{type} Spells</h4>
              {(statBlock.spells[type as keyof typeof statBlock.spells] as any[]).map((level, index) => (
                <div key={index} className="mb-2 p-3 bg-stone-50 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span>Level {level.level}</span>
                    <button 
                      onClick={() => removeSpellLevel(type as any, index)}
                      className="text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Level</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={level.level}
                      onChange={(e) => 
                        updateNestedField(
                          `spells.${type}.${index}.level`,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Spells</label>
                    <input
                      type="text"
                      value={level.spells.join(', ')}
                      onChange={(e) => 
                        updateNestedField(
                          `spells.${type}.${index}.spells`,
                          e.target.value.split(',').map(s => s.trim())
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={level.atWill}
                        onChange={(e) => 
                          updateNestedField(
                            `spells.${type}.${index}.atWill`,
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">At Will</span>
                    </label>
                    {!level.atWill && (
                      <div className="flex items-center">
                        <label className="text-sm mr-2">Times per day:</label>
                        <input
                          type="number"
                          value={level.timesPerDay || ''}
                          onChange={(e) => 
                            updateNestedField(
                              `spells.${type}.${index}.timesPerDay`,
                              parseInt(e.target.value) || undefined
                            )
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Abilities</h3>
          <button 
            onClick={addAbility}
            className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
          >
            <Plus size={14} className="mr-1" /> Add Ability
          </button>
        </div>
        {statBlock.abilities.map((ability, index) => (
          <div key={index} className="mb-4 p-3 bg-stone-50 rounded-md">
            <div className="flex justify-between mb-2">
              <h4 className="font-medium">Ability {index + 1}</h4>
              <button 
                onClick={() => removeAbility(index)}
                className="text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={ability.name}
                onChange={(e) => 
                  updateNestedField(
                    `abilities.${index}.name`, 
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={ability.description}
                onChange={(e) => 
                  updateNestedField(
                    `abilities.${index}.description`, 
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Actions</h3>
          <button 
            onClick={addAction}
            className="text-xs bg-red-700 text-white px-2 py-1 rounded flex items-center"
          >
            <Plus size={14} className="mr-1" /> Add Action
          </button>
        </div>
        {statBlock.actions.map((action, index) => (
          <div key={index} className="mb-4 p-3 bg-stone-50 rounded-md">
            <div className="flex justify-between mb-2">
              <h4 className="font-medium">Action {index + 1}</h4>
              <button 
                onClick={() => removeAction(index)}
                className="text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={action.name}
                  onChange={(e) => 
                    updateNestedField(
                      `actions.${index}.name`, 
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Action Type</label>
                <select
                  value={action.actionType}
                  onChange={(e) => 
                    updateNestedField(
                      `actions.${index}.actionType`, 
                      e.target.value as any
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="free">Free Action</option>
                  <option value="reaction">Reaction</option>
                  <option value="one">One Action</option>
                  <option value="two">Two Actions</option>
                  <option value="three">Three Actions</option>
                  <option value="passive">Passive</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={action.description}
                onChange={(e) => 
                  updateNestedField(
                    `actions.${index}.description`,
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          onClick={resetStatBlock}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset Form
        </button>
      </div>
    </div>
  );
};

export default StatBlockForm;