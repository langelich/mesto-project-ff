import './index.css';
import { createCard } from './components/card';
import { openModal, closeModal, closeModalButton } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserProfile, getCards, patchUserProfile, postCreateCard, patchProfileImg } from './components/api';

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
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

Promise.all([getUserProfile(), getCards()])
  .then(([userProfile, initialCards]) => {
    profileTitle.textContent = userProfile.name;
    profileDescription.textContent = userProfile.about;
    profileImage.style.backgroundImage = `url('${userProfile.avatar}')`; 

    initialCards.forEach(element => {
      const card = createCard(element, userProfile, openModalImage);
      placesList.append(card);
    })
  })
  .catch((err) => {
    console.log(err);
  }); 
  
  
// плавное открытие попапа и слушатель закрытия

popupList.forEach(function (popup) {
  const buttonPopupClose = popup.querySelector('.popup__close');

  popup.classList.add('popup_is-animated');
  buttonPopupClose.addEventListener('click', function(evt) {
    closeModalButton(evt);
  });
});


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
  submitForm(evt, profileForm);
  patchUserProfile({
    name: inputName.value,
    about: inputDescription.value
  })
    .then((result) => {
      closeModal(popupEditProfile);
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;  
    })
    .finally(() => {
      saveButtonSubmit(profileForm.querySelector('.popup__button')) 
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
  submitForm(evt, newPlaceForm)
  Promise.all([postCreateCard({
    name: inputCardName.value,
    link: inputLink.value,
  }), 
  getUserProfile()])
    .then(([cardData, userData]) => {
      const card = createCard(cardData, userData, openModalImage);
      placesList.prepend(card);
      closeModal(popupAddCard);
    })
    .finally(() => {
      saveButtonSubmit(newPlaceForm.querySelector('.popup__button')) 
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
  submitForm(evt, imgProfileForm);
  patchProfileImg({
    avatar: inputUrlImg.value
  })
    .then((result) => {
      closeModal(popupEditImgProfile);
      profileImage.style.backgroundImage = `url('${result.avatar}')`; 
    })
    .finally(() => {
      saveButtonSubmit(imgProfileForm.querySelector('.popup__button')) 
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

// submit форм 

function submitForm(evt, formSelector) {
  evt.preventDefault();
  const buttonSubmit = formSelector.querySelector('.popup__button');

  savingButtonSubmit(buttonSubmit);
}

enableValidation(validationConfig);
