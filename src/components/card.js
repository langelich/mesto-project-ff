export { createCard, deleteCard, isLiked }

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

function createCard(element, deleteCard, isLiked, openModalImage) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const cardLikeButton = placesItem.querySelector('.card__like-button');
  const cardImage = placesItem.querySelector('.card__image');

  cardImage.src = element.link;
  placesItem.querySelector('.card__title').textContent = element.name;
  cardImage.alt = element.name;

  deleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', isLiked);
  cardImage.addEventListener('click', function() {
    openModalImage(cardImage);
});

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
