export { openModal, closeModal };

// Функция открытия попапа

function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  popupElement.addEventListener('mouseup', closeModalOverlay);
  document.addEventListener('keydown', closeEsc);
};

// Функции закрытия попапа

function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
};

  // кликом на оверлей

function closeModalOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.target);
  };
};

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');

    closeModal(popupIsOpened);
  }
};
