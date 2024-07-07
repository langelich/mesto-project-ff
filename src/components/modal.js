export { openModal, openModalImage, closeModal,
  closeModalButton, closeModalOverlay, closeModalEsc, closeEsc }

const popupList = document.querySelectorAll('.popup');

// плавное открытие попапа

window.onload = function() {
  popupList.forEach(function (popup) {
    popup.classList.add('popup_is-animated');
  });
};

// Функция открытия попапа

function openModal(popupElement) {
  const buttonPopupClose = popupElement.querySelector('.popup__close');

  popupElement.classList.add('popup_is-opened');

  buttonPopupClose.addEventListener('click', closeModalButton);

  popupElement.addEventListener('click', closeModalOverlay);

  closeModalEsc();
};

// Функция открытия попапа с картинкой

function openModalImage(evt) {
  const popupImage = document.querySelector('.popup_type_image');

  popupImage.querySelector('.popup__image')
    .src = evt.target.closest('.card__image').src;
  popupImage.querySelector('.popup__caption')
    .textContent = evt.target.closest('.card__image').alt;
  popupImage.querySelector('.popup__image')
    .alt = evt.target.closest('.card__image').alt;

  openModal(popupImage);
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
  const popupIsOpened = document.querySelector('.popup_is-opened');

  if (evt.key === 'Escape') {
    closeModal(popupIsOpened);
  }
};
