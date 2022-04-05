export class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl =baseUrl;
  }
//получить данные профиля с сервера
  getProfile(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

//получить предзагруженные карточки с сервера
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

//отправить на сервер новые данные профиля
  editProfile(name, about){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

//добавить новую карточку на сервер
  addCard(name, link, likes){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
        likes
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

//удалить карточку на сервере
  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  //добавить like
  addLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  //удалить like
  deleteLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  //отправить на сервер новые данные аватар
  editAvatar(avatar){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

}
