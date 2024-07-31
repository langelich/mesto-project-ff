export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: '5edf568f-c702-4496-a888-a9757fc84a0b',
    'Content-Type': 'application/json'
  }
};

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
  })
    .then(getResponse)
    .catch((err) => {
      console.log(err);
    }); 
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(getResponse)
    .catch((err) => {
      console.log(err);
    }); 
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getResponse)
    .catch((err) => {
      console.log(err);
    }); 
};

export const putAddLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(getResponse)
  .catch((err) => {
    console.log(err);
  }); 
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponse)
  .catch((err) => {
    console.log(err);
  }); 
};

export const patchUserProfile = (user) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    })
  })
    .then(getResponse)
    .catch((err) => {
      console.log(err);
    }); 
};

export const postCreateCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
      likes: card.likes,
    })
  })
    .then(getResponse)
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
    .then(getResponse)
    .catch((err) => {
      console.log(err);
    }); 
};