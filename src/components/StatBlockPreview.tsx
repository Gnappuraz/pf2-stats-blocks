import React from 'react';
import { useStatBlock } from '../context/StatBlockContext';

const ActionIcon: React.FC<{ type: string }> = ({ type }) => {
  const getActionSymbol = () => {
    switch(type) {
      case 'one': return '1';
      case 'two': return '2';
      case 'three': return '3';
      case 'free': return '4';
      case 'reaction': return '5';
      default: return '';
    }
  };

  return <span className="symbol">{getActionSymbol()}</span>;
};

const parseMarkdown = (text: string): string => {
  if (typeof text !== 'string') {
    return '';
  }
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
};

const StatBlockPreview: React.FC = () => {
  const { statBlock } = useStatBlock();

  const getModifierString = (mod: number) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const getAbilityModifier = (score: number) => {
    return getModifierString(Math.floor((score - 10) / 2));
  };

  const formatSpells = (spells: { level: number; spells: string[]; atWill?: boolean; timesPerDay?: number }[]) => {
    return spells
      .sort((a, b) => b.level - a.level)
      .map(level => {
        const spellList = level.spells.map(spell => parseMarkdown(spell)).join(', ');
        const frequency = level.atWill ? '(at will)' : level.timesPerDay ? `(×${level.timesPerDay})` : '';
        return `<strong>${level.level}${getOrdinalSuffix(level.level)}</strong> ${spellList}${frequency ? ' ' + frequency : ''}`;
      })
      .join('; ');
  };

  const getOrdinalSuffix = (num: number) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  };

  return (
    <div className="stat-block-preview">
      <div className="stat-block">
        <div className="header">
          <span>{statBlock.name}</span>
          <span>CREATURE {statBlock.level}</span>
        </div>

        <div className="tags">
          <div className="tag">{statBlock.alignment}</div>
          <div className="tag">{statBlock.size}</div>
          {statBlock.traits.map((trait, index) => (
            <div key={index} className="tag">{trait}</div>
          ))}
        </div>

        <div className="section">
          <div className="section-title">Perception</div>
          <div className="section-content" dangerouslySetInnerHTML={{ 
            __html: parseMarkdown(statBlock.perception) 
          }} />
        </div>

        <div className="section">
          <div className="section-title">Languages</div>
          <div className="section-content" dangerouslySetInnerHTML={{ 
            __html: parseMarkdown(statBlock.languages.join(', ')) 
          }} />
        </div>

        <div className="section">
          <div className="section-title">Skills</div>
          <div className="section-content">
            {Object.entries(statBlock.skills)
              .map(([skill, mod]) => `${skill} ${getModifierString(mod)}`)
              .join(', ')}
          </div>
        </div>

        <div className="section">
          <div className="section-title">
            Str {getModifierString(statBlock.abilityScores.str)}, 
            Dex {getModifierString(statBlock.abilityScores.dex)}, 
            Con {getModifierString(statBlock.abilityScores.con)}, 
            Int {getModifierString(statBlock.abilityScores.int)}, 
            Wis {getModifierString(statBlock.abilityScores.wis)}, 
            Cha {getModifierString(statBlock.abilityScores.cha)}
          </div>
        </div>

        {statBlock.interactionAbilities.length > 0 && (
          <div className="section">
            {statBlock.interactionAbilities.map((ability, index) => (
              <div key={index}>
                <div className="section-title">{ability.name}</div>
                <div className="section-content" dangerouslySetInnerHTML={{ 
                  __html: parseMarkdown(ability.description) 
                }} />
              </div>
            ))}
          </div>
        )}

        {statBlock.items && (
          <div className="section">
            <div className="section-title">Items</div>
            <div className="section-content" dangerouslySetInnerHTML={{ 
              __html: parseMarkdown(statBlock.items) 
            }} />
          </div>
        )}

        <hr />

        <div className="section">
          <div className="section-title">AC</div>
          <div className="section-content">
            {statBlock.ac}; <strong>Fort</strong> {getModifierString(statBlock.savingThrows.fortitude)}, 
            <strong>Ref</strong> {getModifierString(statBlock.savingThrows.reflex)}, 
            <strong>Will</strong> {getModifierString(statBlock.savingThrows.will)}
          </div>
        </div>

        <div className="section">
          <div className="section-title">HP</div>
          <div className="section-content">
            {statBlock.hp}
            {(statBlock.immunities.length > 0 || statBlock.resistances.length > 0 || statBlock.weaknesses.length > 0) && '; '}
            {statBlock.immunities.length > 0 && <><strong>Immunities</strong> {statBlock.immunities.join(', ')}</>}
            {statBlock.resistances.length > 0 && <>{statBlock.immunities.length > 0 ? '; ' : ''}<strong>Resistances</strong> {statBlock.resistances.join(', ')}</>}
            {statBlock.weaknesses.length > 0 && <>{(statBlock.immunities.length > 0 || statBlock.resistances.length > 0) ? '; ' : ''}<strong>Weaknesses</strong> {statBlock.weaknesses.join(', ')}</>}
          </div>
        </div>

        {statBlock.automaticAbilities.length > 0 && (
          <div className="section">
            {statBlock.automaticAbilities.map((ability, index) => (
              <div key={index}>
                <div className="section-title">{ability.name}</div>
                <div className="section-content" dangerouslySetInnerHTML={{ 
                  __html: parseMarkdown(ability.description) 
                }} />
              </div>
            ))}
          </div>
        )}

        {statBlock.reactiveAbilities.length > 0 && (
          <div className="section">
            {statBlock.reactiveAbilities.map((ability, index) => (
              <div key={index}>
                <div className="section-title">{ability.name}</div>
                <div className="section-content" dangerouslySetInnerHTML={{ 
                  __html: parseMarkdown(ability.description) 
                }} />
              </div>
            ))}
          </div>
        )}

        <hr />

        <div className="section">
          <div className="section-title">Speed</div>
          <div className="section-content" dangerouslySetInnerHTML={{ 
            __html: parseMarkdown(statBlock.speed)
          }} />
        </div>

        {statBlock.attacks.melee.length > 0 && (
          <div className="section">
            {statBlock.attacks.melee.map((attack, index) => (
              <p key={index} className="melee">
                <strong class="section-title">Melee</strong><ActionIcon type="one" /> {attack.name} {getModifierString(attack.bonus)} [
                {getModifierString(attack.bonus - 5)}/
                {getModifierString(attack.bonus - 10)}], 
                 <strong>Damage</strong> {attack.damage}
                {attack.traits.length > 0 && ` (${attack.traits.join(', ')})`}
              </p>
            ))}

        {statBlock.attacks.ranged.length > 0 && (
          <div className="section">
            {statBlock.attacks.ranged.map((attack, index) => (
              <p key={index} className="melee">
                <strong strong class="section-title">Ranged</strong><ActionIcon type="one" /> {attack.name}  {getModifierString(attack.bonus)} [
                {getModifierString(attack.bonus - 5)}/
                {getModifierString(attack.bonus - 10)}], 
                 <strong>Damage</strong> {attack.damage}, range {attack.range} feet
                {attack.traits.length > 0 && ` (${attack.traits.join(', ')})`}
              </p>
            ))}
          </div>
        )}
          </div>
        )}

        {statBlock.spells && (
          <>
            {statBlock.spells.innate && statBlock.spells.innate.length > 0 && (
              <div className="section">
                <div className="section-title">{statBlock.spells.tradition || 'Divine'} Innate Spells</div>
                <div className="section-content" dangerouslySetInnerHTML={{
                  __html: `${statBlock.spells.dc ? `DC ${statBlock.spells.dc}` : ''}${
                    statBlock.spells.attack ? `; ${getModifierString(statBlock.spells.attack)} to hit` : ''
                  }; ${formatSpells(statBlock.spells.innate)}`
                }} />
              </div>
            )}

            {statBlock.spells.focus && statBlock.spells.focus.length > 0 && (
              <div className="section">
                <div className="section-title">{statBlock.spells.tradition || 'Divine'} Focus Spells</div>
                <div className="section-content" dangerouslySetInnerHTML={{
                  __html: `${statBlock.spells.dc ? `DC ${statBlock.spells.dc}` : ''}${
                    statBlock.spells.attack ? `; ${getModifierString(statBlock.spells.attack)} to hit` : ''
                  }; ${formatSpells(statBlock.spells.focus)}`
                }} />
              </div>
            )}

            {statBlock.spells.rituals && statBlock.spells.rituals.length > 0 && (
              <div className="section">
                <div className="section-title">{statBlock.spells.tradition || 'Divine'} Rituals</div>
                <div className="section-content" dangerouslySetInnerHTML={{
                  __html: `${statBlock.spells.dc ? `DC ${statBlock.spells.dc}` : ''}${
                    statBlock.spells.attack ? `; ${getModifierString(statBlock.spells.attack)} to hit` : ''
                  }; ${formatSpells(statBlock.spells.rituals)}`
                }} />
              </div>
            )}

            {statBlock.spells.prepared && statBlock.spells.prepared.length > 0 && (
              <div className="section">
                <div className="section-title">{statBlock.spells.tradition || 'Divine'} Prepared Spells</div>
                <div className="section-content" dangerouslySetInnerHTML={{
                  __html: `${statBlock.spells.dc ? `DC ${statBlock.spells.dc}` : ''}${
                    statBlock.spells.attack ? `; ${getModifierString(statBlock.spells.attack)} to hit` : ''
                  }; ${formatSpells(statBlock.spells.prepared)}`
                }} />
              </div>
            )}
          </>
        )}

        {statBlock.abilities.length > 0 && (
          <div className="section">
            {statBlock.abilities.map((ability, index) => (
              <div key={index}>
                <div className="section-title">{ability.name}</div>
                <div className="section-content" dangerouslySetInnerHTML={{ 
                  __html: parseMarkdown(ability.description) 
                }} />
              </div>
            ))}
          </div>
        )}

        {statBlock.actions.length > 0 && (
          <div className="section">
            {statBlock.actions.map((action, index) => (
              <div key={index}>
                <div className="section-title">
                  {action.name}
                  {action.actionType !== 'passive' && <ActionIcon type={action.actionType} />}
                </div>
                <div className="section-content" dangerouslySetInnerHTML={{ 
                  __html: parseMarkdown(action.description) 
                }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatBlockPreview;