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

export const updateEditProfile = (name, about) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: tokenAuthorization,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
.then((res) => {
    return res.json();
})
}

export const addNewCard = (name, link) => {
    return fetch(`${BASE_URL}/cards`, {
        method: 'POST',
        headers: {
            authorization: tokenAuthorization,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
.then((res) => {
    return res.json();
})
}





