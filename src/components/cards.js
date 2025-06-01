export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// // Находим попап подтверждения удаления и кнопки
// const popupConfirmDelete = document.querySelector('.popup_type_confirm-delete');
// const confirmDeleteButton = popupConfirmDelete.querySelector('.popup__button_type_confirm');
// const cancelDeleteButton = popupConfirmDelete.querySelector('.popup__button_type_cancel');

// // Функция для открытия попапа подтверждения удаления
// function openConfirmDeletePopup(cardElement, cardId) {
//   openModal(popupConfirmDelete);

//   // Обработчик для кнопки "Да"
//   confirmDeleteButton.onclick = () => {
//     deleteCard(cardId)
//       .then(() => {
//         cardElement.remove(); // Удаляем карточку из DOM
//         closeModal(popupConfirmDelete);
//       })
//       .catch(error => {
//         console.error('Ошибка при удалении карточки:', error);
//       });
//   };

//   // Обработчик для кнопки "Нет"
//   cancelDeleteButton.onclick = () => {
//     closeModal(popupConfirmDelete);
//   };
// }

// // Функция для удаления карточки с сервера
// export const deleteCard = (cardId) => {
//   return fetch(`${BASE_URL}/cards/${cardId}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: tokenAuthorization,
//       'Content-Type': 'application/json',
//     }
//   })
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(new Error(`Error: ${res.status}`));
//   });
// };

// // Обновленный обработчик клика на иконку удаления
// export function handleDeleteClick(cardElement, cardId) {
//   openConfirmDeletePopup(cardElement, cardId);
// }

// // Обновление вызова функции createCard в основном коде
// export function createCard(cardData, onDeleteClick, onLikeClick, onImageClick, userId) {
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
//   const cardImage = cardElement.querySelector('.card__image');
//   cardImage.src = cardData.link;
//   cardImage.alt = cardData.name;
//   cardElement.querySelector('.card__title').textContent = cardData.name;

//   const deleteButton = cardElement.querySelector('.card__delete-button');

//   if (cardData.owner._id !== userId) {
//     deleteButton.style.display = 'none';
//   } else {
//     deleteButton.addEventListener('click', () => onDeleteClick(cardElement, cardData._id));
//   }

//   const likeButton = cardElement.querySelector('.card__like-button');
//   likeButton.addEventListener('click', onLikeClick);

//   const cardLikeCount = cardElement.querySelector('.card__like-count');
//   cardLikeCount.textContent = cardData.likes.length;

//   cardImage.addEventListener('click', () => onImageClick(cardData.link, cardData.name));

//   return cardElement;
// };
