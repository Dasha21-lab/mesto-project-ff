const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, onDeleteClick, onLikeClick, onImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => onDeleteClick(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', onLikeClick);

  cardImage.addEventListener('click', () => onImageClick(cardData.link, cardData.name));
 
  return cardElement;
};

export function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export function deleteClick(card) {
  card.remove();
};
