import './index.css';
import { initialCards, createCard, deleteCard, isLiked } from './components/cards';
import { openModal, openModalImage, closeModal } from './components/modal';


// @todo: DOM узлы

const mainContent = document.querySelector('.content');
const profileInfo = mainContent.querySelector('.profile__info');
const profileEditButton = mainContent.querySelector('.profile__edit-button');
const cardAddButton = mainContent.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard, isLiked, openModalImage);

  placesList.append(card);
});

// Обработчики события:
  // редактирование профиля

profileEditButton.addEventListener('click', function() {
  const popupEditProfile = document.querySelector('.popup_type_edit');

  openModal(popupEditProfile);

  inputName.value = profileInfo
    .querySelector('.profile__title').textContent;
  inputDescription.value = profileInfo
    .querySelector('.profile__description').textContent;

  popupEditProfile.addEventListener('submit', submitProfileEdit);
});

  // добавление карточки

cardAddButton.addEventListener('click', function() {
  const popupAddCard = document.querySelector('.popup_type_new-card');

  openModal(popupAddCard);

  popupAddCard.addEventListener('submit', submitCardAdd);
});

// Функции отправки форм:
  // редактирования профиля

function submitProfileEdit(evt) {
  evt.preventDefault();

  profileInfo.querySelector('.profile__title')
    .textContent = inputName.value;
  profileInfo.querySelector('.profile__description')
    .textContent = inputDescription.value;

  closeModal(evt.target.closest('.popup'));
};

  // добавления карточки

function submitCardAdd(evt) {
  evt.preventDefault();

  const inputCardName = document.querySelector('.popup__input_type_card-name');
  const inputLink = document.querySelector('.popup__input_type_url');

  initialCards.name = inputCardName.value;
  initialCards.link = inputLink.value;
  const card = createCard(initialCards, deleteCard, isLiked, openModalImage);
  placesList.prepend(card);

  closeModal(evt.target.closest('.popup'));
  evt.target.closest('.popup__form').reset();
};
