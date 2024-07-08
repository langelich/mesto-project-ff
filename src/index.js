import './index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, isLiked } from './components/card';
import { openModal, closeModal } from './components/modal';

// @todo: DOM узлы

const mainContent = document.querySelector('.content');
const profileInfo = mainContent.querySelector('.profile__info');
const profileEditButton = mainContent.querySelector('.profile__edit-button');
const cardAddButton = mainContent.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description')
const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image');
const captionInPopup = popupImage.querySelector('.popup__caption')
const placesList = document.querySelector('.places__list');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const popupList = document.querySelectorAll('.popup');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
const popupFormNewPlace = document.forms['new-place'];

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard, isLiked, openModalImage);

  placesList.append(card);
});

// плавное открытие попапа

window.onload = function() {
  popupList.forEach(function (popup) {
    popup.classList.add('popup_is-animated');
  });
};

// Функция открытия попапа с картинкой

function openModalImage(cardImage) {
  imageInPopup.src = cardImage.src;
  captionInPopup.textContent = cardImage.alt;
  imageInPopup.alt = cardImage.alt;

  openModal(popupImage);
};

// Обработчики события:
  // редактирование профиля

profileEditButton.addEventListener('click', function() {
  openModal(popupEditProfile);

  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
});

popupEditProfile.addEventListener('submit', submitProfileEdit);

  // добавление карточки

cardAddButton.addEventListener('click', function() {
  openModal(popupAddCard);
});

popupAddCard.addEventListener('submit', submitCardAdd);

// Функции отправки форм:
  // редактирования профиля

function submitProfileEdit(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closeModal(popupEditProfile);
};

  // добавления карточки

function submitCardAdd(evt) {
  evt.preventDefault();

  initialCards.name = inputCardName.value;
  initialCards.link = inputLink.value;
  const card = createCard(initialCards, deleteCard, isLiked, openModalImage);
  placesList.prepend(card);

  closeModal(popupAddCard);
  popupFormNewPlace.reset();
};
