import { showModal } from './modal';

export function showWinnerModal(fighter) {
  // call showModal function 

  const name = `${fighter.name} Winner!!!!!`;
  const blockWinner = document.createElement('div');
        blockWinner.classList.add('modal-winner__user');

        blockWinner.innerText = `Winner!!!!! Name: ${fighter.name}`;

  const result = {
    title: name,
    bodyElement: blockWinner,
    onClose: () => {
      window.location.reload()
    }
  };
  showModal(result);
}
