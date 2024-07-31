export { createCard };
import { deleteLike, putAddLike, deleteCardFromServer } from '../components/api';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

function createCard(element, userProfile, openModalImage) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardLikeButton = placesItem.querySelector('.card__like-button');
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const cardImage = placesItem.querySelector('.card__image');
  const cardLikeCount = placesItem.querySelector('.card__like-count');
  const cardId = element._id;
  const cardLikes = element.likes;
  const userId = userProfile._id;

  cardImage.src = element.link;
  placesItem.querySelector('.card__title').textContent = element.name;
  cardImage.alt = element.name;
  cardLikeCount.textContent = element.likes.length;

  if (element.owner._id === userId) {
    deleteButton.addEventListener('click', function(evt) {
    const cardDeleted = evt.target.closest('.places__item');
    deleteCardFromServer(cardId)
      .then(() => {
        cardDeleted.remove();
      })
    })
  } else {
    deleteButton.remove();
  }   

  cardImage.addEventListener('click', function() {
    openModalImage(cardImage);
  });
  
  cardLikes.forEach(elem => {
    if (elem._id === userId) {
      cardLikeButton.classList.add('card__like-button_is-active');
    } else {
      cardLikeButton.classList.remove('card__like-button_is-active');
    }
  });
  
  cardLikeButton.addEventListener('click', function(evt) {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
      deleteLike(cardId)
        .then(result => {
          isLiked(evt);
          cardLikeCount.textContent = result['likes'].length;
        })
    } else {
      putAddLike(cardId)
        .then(result => {
          isLiked(evt);
          cardLikeCount.textContent = result['likes'].length;
        })
    }
  });

  return placesItem;
};

function isLiked(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
