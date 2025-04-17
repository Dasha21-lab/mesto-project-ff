// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(cardData, onDeleteClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => onDeleteClick(cardElement));

  return cardElement;
}

function deleteClick(card) {
  card.remove();
}

function showCards(cards) {
  const placesList = document.querySelector('.places__list');
  cards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteClick);
    placesList.append(cardElement);
  });
}

showCards(initialCards);

