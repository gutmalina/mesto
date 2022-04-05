export class Card{//хранит разметку карточки и наполняет его уникальным содержанием
  constructor(userId, item, cardSelector , handleCardClick, openPopupDeleteCard, handleLikeClick){
    this._userId = userId;//id свое, как пользователя
    this._link = item.link;
    this._alt = item.name;
    this._name = item.name;
    this._likes = item.likes;
    this._id = item._id;//id самой карты
    this._ownerId = item.owner._id;//id автора карточки
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupDeleteCard = openPopupDeleteCard;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {//ищет шаблон карточки, клонирует и отдает для наполнения данными
    const cardElement = document.querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {//подставляет данные в шаблон карточки и отдает готовую карточку для дальнейшего использования
    this._element = this._getTemplate();
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name
    this._element.querySelector('.card__text').textContent = this._name;
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    this._button = this._element.querySelector('.button_type_like-card');
    this._delete = this._element.querySelector('.button_type_delete-card');
    this._setEventListeners();
    this.setLikes(this._likes);
    if(this._ownerId !== this._userId){
      this._delete.style.display = 'none'
    };
    return this._element;
  }

  _setEventListeners() {
    //слушатель на лайк
    this._button.addEventListener('click', () => {
      this._handleLikeClick(this._id)
    });

    //слушатель открыть попап для удаления карточки
    this._delete.addEventListener('click', () => {
      this._openPopupDeleteCard(this._id, this._element);
    });

    //слушатель клика по карточке для увеличения
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  //проверка данных: Id кто лайкнул и Id пользователя
  isLiked(){
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }

  //установка количества лайков и изменение цвета сердечка
  setLikes(newLikes){
    this._likes = newLikes;
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;
    if(this.isLiked()){
      this._addLike();
    }else{
      this._deleteLike();
    }
  }

  //закрасить сердечко
  _addLike(){
    this._button.classList.add('button_active-like');
  }

  //удалить закрашивание сердечка
  _deleteLike(){
    this._button.classList.remove('button_active-like');
  }

}
