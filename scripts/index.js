// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const mainContent = document.querySelector('.content');
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(elem, deleteCard) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = placesItem.querySelector('.card__delete-button');

    placesItem.querySelector('.card__image').src = elem.link;
    placesItem.querySelector('.card__title').textContent = elem.name;
    placesItem.querySelector('.card__image').alt = elem.name;
    
    deleteButton.addEventListener('click', deleteCard);

    return placesItem;
};

// @todo: Функция удаления карточки

function deleteCard(evt) {
    const cardDeleted = evt.target.closest('.places__item');
    cardDeleted.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function (elem) {
    const card = createCard(elem, deleteCard);
    placesList.append(card);
})