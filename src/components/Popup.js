export class Popup {
  constructor(popupSelector){
    this._popup = popupSelector;
  }

  open(){
    this._popup.classList.add('popup_opened');//открыть попап
    document.addEventListener('keydown', this._handleEscClose);//добавить слушатель Escape
   }

  close(){
    this._popup.classList.remove('popup_opened');//закрыть попап
    document.removeEventListener('keydown', this._handleEscClose);//удалить слушатель Escape
  }

  _handleEscClose = (evt) => {//закрыть попап нажав Escape
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners(){//закрыть попап кликом по оверлей и по крестику
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')
          || evt.target.classList.contains('popup__close')) {
        this.close();
      };
    });
  }

}
