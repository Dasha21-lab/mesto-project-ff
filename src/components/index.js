// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, handleLikeClick, deleteClick} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {updateEditProfile, getUserInfo, getCard, addNewCard} from './api.js';

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
const classProfileImage = document.querySelector('.profile__image');


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function handleImageClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;

  openModal(imagePopup);
};

/*
function showCards(cards) {
  cards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteClick, handleLikeClick, handleImageClick);
    placesList.append(cardElement);
  });
};
*/

//showCards(initialCards);

addButton.addEventListener('click', () => {
  clearValidation(formNewPlace, validationConfig);

  openModal(popupNewCard);
});
  
editButton.addEventListener('click', () => {
  nameInput.value = classProfileTitle.textContent;
  jobInput.value = classProfileDescription.textContent;
  
  clearValidation(formEditProfile, validationConfig);

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

  updateEditProfile(nameInput.value, jobInput.value)
  .then(data => {  
    classProfileTitle.textContent = data.name;
    classProfileDescription.textContent = data.about;
  })
    .catch(error => {
      console.error('There was a problem with the update operation:', error);
    });

  closeModal(popupEdit);
};

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: inputNameFormNewPlace.value,
    link: inputLinkFormNewPlace.value
  };
addNewCard(newCard.name, newCard.link)
.then (() => {
  const returnedCard = createCard(newCard, deleteClick, handleLikeClick, handleImageClick);
  placesList.prepend(returnedCard);

  formNewPlace.reset();

  closeModal(popupNewCard);
})
};

formNewPlace.addEventListener('submit', handleCardSubmit);

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCard()]).then(([userInfo, cards]) => {
    classProfileTitle.textContent = userInfo.name;
    classProfileDescription.textContent = userInfo.about;
    classProfileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    cards.forEach(card => {
      // TODO: вернуть для проверки по ID
        const cardElement = createCard(card, deleteClick, handleLikeClick, handleImageClick);
        placesList.append(cardElement);

      if (card.owner._id !== userInfo._id) {
      const deleteButton = cardElement.querySelector('.card__delete-button');
      deleteButton.addEventListener('click', () => onDeleteClick(cardElement));
      deleteButton.style.display = 'none';
      }    
    });
})

/*
getUserInfo()
  .then((data) => {
    classProfileTitle.textContent = data.name;
    classProfileDescription.textContent = data.about;
    classProfileImage.style.backgroundImage = `url(${data.avatar})`;
  })
 .catch((error) => {
    console.error('Ошибка при получении данных пользователя:', error);
  });

getCard()
  .then((data) => {
    showCards(data);
    //console.log(data)
  })
  .catch((error) => {
    console.error('Ошибка при получении данных пользователя:', error);
  });
*/
/*
updateEditProfile()
  .then(data => {
    console.log(data);
  })
    .catch(error => {
      console.error('There was a problem with the update operation:', error);
    });
    */

// УДАЛЕНИЕ 

const popupConfirmDelete = document.querySelector('.popup_type_confirm-delete');
const popupButtonDelete = document.querySelector('.popup__button_confirm-delete');
const deleteButton = document.querySelector('.card__delete-button');

function openPopupDelete(evt) {
 evt.preventDefault();


}

deleteButton.addEventListener('click', () => {
  openModal(popupConfirmDelete);
});

popupConfirmDelete.addEventListener('submit', openPopupDelete);