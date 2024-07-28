import './index.css';
import { createCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { validationConfig, enableValidation, clearValidation } from './components/validation';
import { getUserProfile, getCards, patchUserProfile, postCreateCard } from './components/api';
export { profileTitle, profileInfo, mainContent, profileDescription, profileImage, openModalImage, placesList };

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
const newPlaceForm = document.forms['new-place'];
const profileForm = document.forms['edit-profile'];
const profileImage = mainContent.querySelector('.profile__image');
const popupEditImgProfile = document.querySelector('.popup_type_edit-img');
const inputUrlImg = popupEditImgProfile.querySelector('.popup__input_type_url-img');
const imgProfileForm = document.forms['link-img'];

const promises = [getUserProfile(), getCards()];
Promise.all(promises);

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

  // редактирование профиля

profileEditButton.addEventListener('click', function() {
  openModal(popupEditProfile);

  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  
  clearValidation(profileForm, validationConfig);
})

profileForm.addEventListener('submit', submitProfileForm);

function submitProfileForm(evt) {
  evt.preventDefault();
  const buttonSubmit = profileForm.querySelector('.popup__button');

  savingButtonSubmit(buttonSubmit);
  patchUserProfile({
    name: inputName.value,
    about: inputDescription.value
  })
    .then(() => {
      closeModal(popupEditProfile);
    })
    .finally(() => {
      saveButtonSubmit(buttonSubmit) 
    })
};

  // добавление карточки

cardAddButton.addEventListener('click', function() {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupAddCard);
});
  
newPlaceForm.addEventListener('submit', submitCardAdd);
  
function submitCardAdd(evt) {
  evt.preventDefault();
  const buttonSubmit = newPlaceForm.querySelector('.popup__button');

  savingButtonSubmit(buttonSubmit);
  postCreateCard({
    name: inputCardName.value,
    link: inputLink.value,
    likes: '0'
  })
    .then(result => {
      const card = createCard(result, openModalImage);
      placesList.prepend(card);
      closeModal(popupAddCard);
    })
    .finally(() => {
      saveButtonSubmit(buttonSubmit);
    })
};

// Изменение картинки профиля

profileImage.addEventListener('click', function() {
  imgProfileForm.reset();
  openModal(popupEditImgProfile);
  clearValidation(imgProfileForm, validationConfig);
});

imgProfileForm.addEventListener('submit', submitProfileImgForm);

function submitProfileImgForm(evt) {
  evt.preventDefault();
  const buttonSubmit = imgProfileForm.querySelector('.popup__button');

  savingButtonSubmit(buttonSubmit);
  patchProfileImg({
    avatar: inputUrlImg.value
  })
    .then((result) => {
      closeModal(popupEditImgProfile);
      profileImage.style.backgroundImage = `url('${result.avatar}')`; 
    })
    .finally(() => {
      saveButtonSubmit(buttonSubmit);
    })
};

// Кнопка "Сохранение..."

function savingButtonSubmit(buttonSubmit) {
  buttonSubmit.textContent = 'Сохранение...';
}

// Кнопка "Сохранить"

function saveButtonSubmit(buttonSubmit) {
      buttonSubmit.textContent = 'Сохранить';
}

enableValidation(validationConfig);
