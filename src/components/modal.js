export { openModal, closeModal };

// Функция открытия попапа

function openModal(popupElement) {
  const buttonPopupClose = popupElement.querySelector('.popup__close');

  popupElement.classList.add('popup_is-opened');
  buttonPopupClose.addEventListener('click', closeModalButton);
  popupElement.addEventListener('click', closeModalOverlay);

  closeModalEsc();
};

// Функции закрытия попапа

function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
};

  // кнопкой

function closeModalButton(evt) {
  closeModal(evt.target.closest('.popup'));
};

  // кликом на оверлей

function closeModalOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.target.closest('.popup'));
  };
};

  // Esc

function closeModalEsc() {
  if (document.querySelector('.popup_is-opened')) {
    document.addEventListener('keydown', closeEsc);
  };
};

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');

    closeModal(popupIsOpened);
  }
};
