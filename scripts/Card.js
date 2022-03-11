import { openPopup, popupImage, imgPopupImage, captionPopupImage } from "./index.js";

export class Card{//хранит разметку карточки и наполняет его уникальным содержанием
  constructor(link, name, cardSelector){
    this._link = link;
    this._alt = name;
    this._name = name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {//функция для возврата разметки карточки
    const cardElement = document.querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);// забираем разметку из HTML и клонируем элемент
    return cardElement;// вернём DOM-элемент карточки
  }

  generateCard() {//подготовит карточку к публикации. Он добавит данные в разметку
    this._element = this._getTemplate();// Запишем разметку в приватное поле _element.Так у других элементов появится доступ к ней.
    this._element.querySelector('.card__img').src = this._link;// Добавим данные
    this._element.querySelector('.card__img').alt = this._name
    this._element.querySelector('.card__text').textContent = this._name;
    this._button = this._element.querySelector('.button_type_like-card');
    this._setEventListeners();
    return this._element;// Вернём элемент наружу
  }

  _setEventListeners() {
    this._button.addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.button_type_delete-card').addEventListener('click', () => {this._deleteCard();
    });
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _likeCard(){
    this._button.classList.toggle('button_active-like');
  }

  _deleteCard(){
    this._element.remove();
  }

  _handleCardClick(){//открыть попап с увеличенной карточкой
    openPopup(popupImage);
    imgPopupImage.src = this._link;
    captionPopupImage.textContent = this._name;
    imgPopupImage.alt = this._name;
  }

}
