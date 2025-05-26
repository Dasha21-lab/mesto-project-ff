export function createCard(cardData, onDeleteClick, onLikeClick, onImageClick) {
  const cardTemplate = document.querySelector('#card-template').content; 
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => onDeleteClick(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', onLikeClick);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => onImageClick(cardData.link, cardData.name));
 
  return cardElement;
};

export function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export function deleteClick(card) {
  card.remove();
};