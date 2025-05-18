// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import {initialCards} from './cards.js';

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

// убрать код
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const imageButton = document.querySelector('.card__image');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');

function openPopup(popup) {

}

addButton.addEventListener('click', (evt) => {

});

editButton.addEventListener('click', (evt) => {
 openPopup(editPopup);
});

imageButton.addEventListener('click', (evt) => {

});