// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import {createCard, handleLikeClick} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {updateEditProfile, getUserInfo, getCard, addNewCard, deleteCard, updateProfileAvatar} from './api.js';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupButtons = document.querySelectorAll('.popup__close');
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const formNewPlace = document.querySelector('.popup__form[name="new-place"]');
const formAvatarProfile = document.querySelector('.popup__form[name="avatar-profile"]');
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
const popupConfirmDelete = document.querySelector('.popup_type_confirm-delete');
const popupButtonDelete = document.querySelector('.popup__button_confirm-delete');
const popupAvatar = document.querySelector('.popup_type_avatar');
const inputAvatar = document.querySelector('.popup__input_type_avatar');
const loadingText = 'Сохранение...';
const initialText = 'Сохранить';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let globalCardHandlerObj;

function handleImageClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;

  openModal(imagePopup);
};

addButton.addEventListener('click', () => {
  clearValidation(formNewPlace, validationConfig);

  formNewPlace.reset();

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

function handleLoadingState(submitButton, isLoading) {
  if (isLoading) {
      submitButton.textContent = loadingText;
    } else {
      submitButton.textContent = initialText;
    };
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = formEditProfile.querySelector('.popup__button');
  handleLoadingState(submitButton, true);

  updateEditProfile(nameInput.value, jobInput.value)
    .then((data) => {
      classProfileTitle.textContent = data.name;
      classProfileDescription.textContent = data.about;
      closeModal(popupEdit);
    })
    
    .catch((err) => {
      console.log('There was a problem with the update operation:', err);
    })

    .finally(() => {
      handleLoadingState(submitButton, false);
    });
};

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();

  const submitButton = formNewPlace.querySelector('.popup__button');
  handleLoadingState(submitButton, true);

  const newCard = {
    name: inputNameFormNewPlace.value,
    link: inputLinkFormNewPlace.value
  };

  addNewCard(newCard.name, newCard.link)
    .then ((data) => {
      const returnedCard = createCard(data, deleteClick, handleLikeClick, handleImageClick);
      placesList.prepend(returnedCard);

      formNewPlace.reset();

      closeModal(popupNewCard);
    })

    .catch((err) => {
      console.log('There was a problem with the update operation:', err);
    })

    .finally(() => {
      handleLoadingState(submitButton, false);
    });
};

formNewPlace.addEventListener('submit', handleCardSubmit);

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCard()])
  .then(([userInfo, cards]) => {
    classProfileTitle.textContent = userInfo.name;
    classProfileDescription.textContent = userInfo.about;
    classProfileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    cards.forEach(card => {
      let cardElement;

      if (card.owner._id === userInfo._id) {
        cardElement = createCard(card, deleteClick, handleLikeClick, handleImageClick);
      } else {
        cardElement = createCard(card, undefined, handleLikeClick, handleImageClick);
      };

      placesList.append(cardElement);
    });
  })

  .catch((err) => {
    console.log('There was a problem with the update operation:', err);
  });

popupButtonDelete.addEventListener('click', () => handleDeleteClick(globalCardHandlerObj));
  
function deleteClick(cardObj) {
  globalCardHandlerObj = cardObj;
  openModal(popupConfirmDelete);
};

function handleDeleteClick(cardObj) {
  if (cardObj) {
    deleteCard(cardObj.id)
    .then(() => {
      closeModal(popupConfirmDelete);
      cardObj.element.remove();
    })
    
    .catch((err) => {
      console.log('There was a problem with the update operation:', err);
    });
  };
};

classProfileImage.addEventListener('click', () => {
  clearValidation(formAvatarProfile, validationConfig);

  formAvatarProfile.reset();

  openModal(popupAvatar);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = popupAvatar.querySelector('.popup__button');
  handleLoadingState(submitButton, true);

  const avatar = inputAvatar.value;

  updateProfileAvatar(avatar) 
    .then((data) => {
      classProfileImage.setAttribute("style", `background-image: url('${data.avatar}')`);
              
      closeModal(popupAvatar);
    })

    .catch((err) => {
      console.log('There was a problem with the update operation:', err);
    })

   .finally(() => {
      handleLoadingState(submitButton, false);
    });
};

popupAvatar.addEventListener('submit', handleAvatarFormSubmit);
