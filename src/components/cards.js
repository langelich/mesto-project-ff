export { initialCards, createCard, deleteCard, isLiked }

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Функция создания карточки

function createCard(element, deleteCard, isLiked, openPopupImage) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const cardLikeButton = placesItem.querySelector('.card__like-button');
  const cardImage = placesItem.querySelector('.card__image');

  placesItem.querySelector('.card__image').src = element.link;
  placesItem.querySelector('.card__title').textContent = element.name;
  placesItem.querySelector('.card__image').alt = element.name;

  deleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', isLiked);
  cardImage.addEventListener('click', openPopupImage);

  return placesItem;
};

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const cardDeleted = evt.target.closest('.places__item');

  cardDeleted.remove();
};

function isLiked(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};
