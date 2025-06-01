const tokenAuthorization = 'd2a4abef-92fa-477b-aa27-386ad8407ec3';
const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-39';

export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            authorization: tokenAuthorization,
            'Content-Type': 'application/json',
        }
    })
.then((res) => {
    return res.json();
})
}

export const getCard = () => {
    return fetch(`${BASE_URL}/cards`, {
        method: 'GET',
        headers: {
            authorization: tokenAuthorization,
            'Content-Type': 'application/json',
        }
    })
.then((res) => {
    return res.json();
})
}








// return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-39/cards', {
//   headers: {
//     authorization: 'd2a4abef-92fa-477b-aa27-386ad8407ec3'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });