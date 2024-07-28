export { createCard };
import { openModal, closeModal } from './modal';
import { deleteLike, putAddLike, deleteCardId } from '../components/api';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const cardDeleteForm = document.forms['card-delete'];

// @todo: Функция создания карточки

function createCard(element, openModalImage) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardLikeButton = placesItem.querySelector('.card__like-button');
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const cardImage = placesItem.querySelector('.card__image');
  const cardLikeCount = placesItem.querySelector('.card__like-count');
  const cardId = element._id;
  const cardLikes = element.likes;

  cardImage.src = element.link;
  placesItem.querySelector('.card__title').textContent = element.name;
  cardImage.alt = element.name;
  cardLikeCount.textContent = element.likes.length;

  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    cardLikeButton.classList.add('card__like-button_is-active')
  } else {
  cardLikeButton.classList.remove('card__like-button_is-active')
  }

  if (element.owner._id === 'ef7ae34b34067f547064abac') {
    deleteButton.addEventListener('click', function(evt) {
      const cardDeleted = evt.target.closest('.places__item');

      openModal(popupDeleteCard);
      cardDeleteForm.addEventListener('submit', function(evt) {
        submitDeleteCard(evt, cardId, cardDeleted);
      })
    });
    
  } else {
    deleteButton.remove();
  }   

  cardImage.addEventListener('click', function() {
    openModalImage(cardImage);
  });
  
  cardLikes.forEach(elem => {
    if (elem._id === 'ef7ae34b34067f547064abac') {
      cardLikeButton.classList.add('card__like-button_is-active')
    } else {
      cardLikeButton.classList.remove('card__like-button_is-active')
    }
  });
  
  cardLikeButton.addEventListener('click', function(evt) {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
      isLiked(evt);
      deleteLike(cardId)
        .then(result => {
          cardLikeCount.textContent = result['likes'].length;
        })
    } else {
      isLiked(evt);
      putAddLike(cardId)
        .then(result => {
          console.log(result)
          cardLikeCount.textContent = result['likes'].length;
        })
    }
  });

  return placesItem;
};


function isLiked(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// удаление карточки

function submitDeleteCard(evt, cardId, cardDeleted) {
  evt.preventDefault();

  deleteCardId(cardId)
    .then(() => {
      cardDeleted.remove();
      closeModal(popupDeleteCard);
    })
}

