export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  
  document.addEventListener('keydown', handleEscapeKey);
};

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
};

function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    };
  };
};