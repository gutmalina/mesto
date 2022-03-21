export class Card{//хранит разметку карточки и наполняет его уникальным содержанием
  constructor(link, name, cardSelector, handleCardClick){
    this._link = link;
    this._alt = name;
    this._name = name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {//ищет шаблон карточки, клонирует и отдает для наполнения данными
    const cardElement = document.querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);// забираем разметку из HTML и клонируем элемент
    return cardElement;// вернём DOM-элемент карточки
  }

  generateCard() {//подставляет данные в шаблон карточки и отдает готовую карточку для дальнейшего использования
    this._element = this._getTemplate();// Запишем разметку в приватное поле _element.Так у других элементов появится доступ к ней.
    this._element.querySelector('.card__img').src = this._link;// Добавим данные
    this._element.querySelector('.card__img').alt = this._name
    this._element.querySelector('.card__text').textContent = this._name;
    this._button = this._element.querySelector('.button_type_like-card');
    this._setEventListeners();
    return this._element;// Вернём элемент наружу
  }

  _setEventListeners() {
    this._button.addEventListener('click', () => {//слушатель на лайк
      this._likeCard();
    });
    this._element.querySelector('.button_type_delete-card').addEventListener('click', () => {this._deleteCard();//слушатель удалить карточку
    });
    this._element.querySelector('.card__img').addEventListener('click', () => {//слушатель клика по карточке для увеличения
      this._handleCardClick(this._link, this._name);
    });
  }

  _likeCard(){
    this._button.classList.toggle('button_active-like');
  }

  _deleteCard(){
    this._element.remove();
  }

}

