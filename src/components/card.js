import {createLikeCard, deleteLikeCard} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(currentUserId, cardData, onDeleteClick, onLikeClick, onImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  let cardObj = {
    "element": cardElement,
    "id": cardData._id
  };

  const deleteButton = cardElement.querySelector('.card__delete-button');

  if (onDeleteClick) {
    deleteButton.addEventListener('click', () => onDeleteClick(cardObj));
  } else {
    deleteButton.style.display = 'none';
  };

  const likes = cardData.likes;
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => onLikeClick(evt, cardObj));
  
  likes.forEach((like) => {
    if (like._id === currentUserId) {
      likeButton.classList.toggle('card__like-button_is-active');
    };
  });

  const cardLikeCount = cardElement.querySelector('.card__like-count');
  cardLikeCount.textContent = likes.length; 

  cardImage.addEventListener('click', () => onImageClick(cardData.link, cardData.name));

  return cardElement;
};

export function handleLikeClick(evt, cardObj) {
  const liked = evt.target.classList.toggle('card__like-button_is-active');

  const cardLikeCount = cardObj.element.querySelector('.card__like-count');
  const cardId = cardObj.id;

  if(liked) {
    createLikeCard(cardId)
      .then((data) => {
        cardLikeCount.textContent = data.likes.length;
      })

      .catch((err) => {
        console.log('There was a problem with the update operation:', err);
      });

  } else {
    deleteLikeCard(cardId)
      .then((data) => {
        cardLikeCount.textContent = data.likes.length;
      })

      .catch((err) => {
        console.log('There was a problem with the update operation:', err);
      });
    };
};
