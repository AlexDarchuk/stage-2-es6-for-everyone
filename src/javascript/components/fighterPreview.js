import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  
  const { name, health, attack, defense } = fighter;
  
  const fighterImg = createFighterImage(fighter);
  const fighterUser = createElement({
    tagName: 'div',
    className: 'fighter-preview__user',
  });

  fighterUser.innerHTML = `
    <h1>${name}</h1>
    <div>Health: ${health}</div>
    <div>Attack: ${attack}</div>
    <div>Defense: ${defense}</div>`;

  fighterElement.append( fighterImg, fighterUser );
  
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
