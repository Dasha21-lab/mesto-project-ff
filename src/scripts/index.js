// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, handleLikeClick, deleteClick} from './card.js';
import {openModal, closeModal} from './modal.js';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupButton = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const classProfileTitle = document.querySelector('.profile__title');
const classProfileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const formNewPlace = document.querySelector('.popup__form[name="new-place"]');

function handleImageClick(link, name) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
};

function showCards(cards) {
  cards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteClick, handleLikeClick, handleImageClick);
    placesList.append(cardElement);
  });
};

showCards(initialCards);

addButton.addEventListener('click', () => openModal(document.querySelector('.popup_type_new-card')));

editButton.addEventListener('click', () => openModal(document.querySelector('.popup_type_edit')));

popupButton.forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    const popup = closeButton.closest('.popup');
    closeModal(popup);
  }); 
});

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
  });
});

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

nameInput.value = classProfileTitle.textContent;
jobInput.value = classProfileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();

  classProfileTitle.textContent = nameInput.value;
  classProfileDescription.textContent = jobInput.value;

  closeModal(document.querySelector('.popup_is-opened'));
};

formElement.addEventListener('submit', handleFormSubmit);

const nameCard = formNewPlace.querySelector('.popup__input_type_card-name');
const linkCard = formNewPlace.querySelector('.popup__input_type_url');
 
function handleCardSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: nameCard.value, 
    link: linkCard.value
  };

  const returnedCard = createCard(newCard, deleteClick, handleLikeClick, handleImageClick);
  placesList.prepend(returnedCard);

  formNewPlace.reset();

  closeModal(document.querySelector('.popup_is-opened'));
};

formNewPlace.addEventListener('submit', handleCardSubmit);