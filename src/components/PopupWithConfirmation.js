import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector, deleteCardServer){
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._deleteCardServer = deleteCardServer;
    this._button = this._form.querySelector('.button_style_save');
  }

  open(id, element){
    super.open();
    this._id = id;
    this._element = element;
  }

  //Submit формы удаления карточки
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(evt);
      this.renderLoading(true);
      this._deleteCardServer(this._id);//удалить с сервера
    });
  }

  //удалить карточку со страницы
  deleteCard(){
    this._element.remove();
  }

  //изменение текста кнопки при ожидании ответа от сервера
  renderLoading(isLoading){
    if(isLoading){
      this._button.textContent = 'Удаление...';
    }else{
      this._button.textContent = 'Да'
    }
  }

}
