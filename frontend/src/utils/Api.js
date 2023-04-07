class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  async getInitialCards() {
    const res = await fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async getUserInfo() {
    const res = await fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async setUserInfo(newUser) {
    const res = await fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newUser),
    });
    return this._checkResponse(res);
  }

  async addCard({ name, link }) {
    const res = await fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
    return this._checkResponse(res);
  }

  async setAvatar({ avatar }) {
    const res = await fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
    return this._checkResponse(res);
  }

  async deleteCard(id) {
    const res = await fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async changeLikeCardStatus(id, isLiked) {
    const res = await fetch(`${this._url}cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  url: 'https://api.denisd.nomoredomains.monster/',
  headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  },
});
export default api;
