import { controls } from '../../constants/controls';


export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over

    const leftFighterIndicator = document.getElementById('left-fighter-indicator');
    const rightFighterIndicator = document.getElementById('right-fighter-indicator'); rightFighterIndicator

    leftFighterIndicator.style.width = '100%';
    rightFighterIndicator.style.width = '100%';

    let isBlockLeft = false;
    let isBlockRight = false;

    const state = {
      fighterLeft: { health: firstFighter.health }, 
      fighterRight: { health: secondFighter.health }, 
    };

    document.addEventListener('keydown', function (event) {
      const currentAction = event.code;

      switch (currentAction) {
        case controls.PlayerOneAttack:
          if (!isBlockRight && !isBlockLeft) { 
            state.fighterRight.health -= getDamage(firstFighter, secondFighter);
            state.fighterRight.health = state.fighterRight.health < 0 ? 0 : state.fighterRight.health;
            rightFighterIndicator.style.width = (100 * state.fighterRight.health) / secondFighter.health + '%';
          }
          break;
        case controls.PlayerOneBlock:
          isBlockLeft = true;
          break;
        case controls.PlayerTwoAttack:
          if (!isBlockLeft && !isBlockRight) {
            state.fighterLeft.health -= getDamage(secondFighter, firstFighter);
            state.fighterLeft.health = state.fighterLeft.health < 0 ? 0 : state.fighterLeft.health;
            leftFighterIndicator.style.width = (100 * state.fighterLeft.health) / firstFighter.health + '%';
          }
          break;
        case controls.PlayerTwoBlock:
          isBlockRight = true;
          break;

        default:
          break;
      }

      if (state.fighterLeft.health <= 0) {
        resolve(secondFighter);
      } else if (state.fighterRight.health <= 0) {
        resolve(firstFighter);
      }
    });

    document.addEventListener('keyup', function (event) {
      const currentAction = event.code;

      switch (currentAction) {
        case controls.PlayerOneBlock:
          isBlockLeft = false;
          break;

        case controls.PlayerTwoBlock:
          isBlockRight = false;
          break;

        default:
          break;
      }
    });
  });
}

export function getDamage(attacker, defender) {
  // return damage

  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);
  return blockPower > hitPower ? 0 : hitPower - blockPower;
}

export function getHitPower(fighter) {
  // return hit power
  const { attack } = fighter;
  return attack * (Math.random() + 1);
}

export function getBlockPower(fighter) {
  // return block power
  const { defense } = fighter;
  return defense * (Math.random() + 1);
}
