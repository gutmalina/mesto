export class Popup {
  constructor(popupSelector){
    this._popup = popupSelector;
  }

  //открыть попап + слушатель ESC
  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
   }

  //закрыть попап + снять слушатель ESC
  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //закрыть попап при нажатии ESC
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  //закрыть попап кликом по оверлей и по крестику
  setEventListeners(){
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')
          || evt.target.classList.contains('popup__close')) {
        this.close();
      };
    });
  }

}
