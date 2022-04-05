import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector, deleteCardServer){
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._deleteCardServer = deleteCardServer;
  }

  //Submit формы удаления карточки
  setEventListeners(id, element){
    this._id = id;
    this._element = element;
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(evt);
      this._deleteCardServer(this._id);//удалить с сервера
      this._deleteCard();
      this.close();
    });
  }

  //удалить карточку со страницы
  _deleteCard(){
    this._element.remove();
  }

}
