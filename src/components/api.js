import { profileTitle, profileInfo, mainContent, profileDescription, profileImage, openModalImage, placesList } from '../index';
import { createCard } from './card';

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: '5edf568f-c702-4496-a888-a9757fc84a0b',
    'Content-Type': 'application/json'
  }
}

export const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }) 
    .then(result => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      profileImage.style.backgroundImage = `url('${result.avatar}')`; 
    })
    .catch((err) => {
      console.log(err);
    }); 
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
      if (res.ok) {
        return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    }) 
    .then(result => { 
      result.forEach(element => {
      const card = createCard(element, openModalImage);
      placesList.append(card);
      });
    })
    .catch((err) => {
      console.log(err);
    }); 
};

export const deleteCardId = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-18/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }) 
    .catch((err) => {
      console.log(err);
    }); 
};

export const putAddLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  }); 
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  }) 
  .catch((err) => {
    console.log(err);
  }); 
};

export const patchUserProfile = (user) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    })
  })
    .then(res => res.json())
    .then(result => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    }); 
};

export const postCreateCard = (card) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
      likes: card.likes,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      }) 
    .catch((err) => {
      console.log(err);
    }); 
};

export const patchProfileImg = (user) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: user.avatar
    })
  })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    }) 
    .catch((err) => {
      console.log(err);
    }); 
};