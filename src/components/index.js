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
const popupButtons = document.querySelectorAll('.popup__close');
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const formNewPlace = document.querySelector('.popup__form[name="new-place"]');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageCaption = imagePopup.querySelector('.popup__caption');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const inputNameFormNewPlace = formNewPlace.querySelector('.popup__input_type_card-name');
const inputLinkFormNewPlace = formNewPlace.querySelector('.popup__input_type_url');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const classProfileTitle = document.querySelector('.profile__title');
const classProfileDescription = document.querySelector('.profile__description');

function handleImageClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;

  openModal(imagePopup);
};

function showCards(cards) {
  cards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteClick, handleLikeClick, handleImageClick);
    placesList.append(cardElement);
  });
};

showCards(initialCards);

addButton.addEventListener('click', () => {
  openModal(popupNewCard);
});
  
editButton.addEventListener('click', () => {
  nameInput.value = classProfileTitle.textContent;
  jobInput.value = classProfileDescription.textContent;
  
  openModal(popupEdit);
});

popupButtons.forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    const popup = closeButton.closest('.popup');
    closeModal(popup);
  }); 
});

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      };
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  classProfileTitle.textContent = nameInput.value;
  classProfileDescription.textContent = jobInput.value;
  
  closeModal(popupEdit);
};

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: inputNameFormNewPlace.value,
    link: inputLinkFormNewPlace.value
  };

  const returnedCard = createCard(newCard, deleteClick, handleLikeClick, handleImageClick);
  placesList.prepend(returnedCard);

  formNewPlace.reset();

  closeModal(popupNewCard);
};

formNewPlace.addEventListener('submit', handleCardSubmit);