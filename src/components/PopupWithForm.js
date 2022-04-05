import { Popup } from './Popup.js';

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleSubmit){
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._button = this._form.querySelector('.button_style_save');
    this._handleSubmit = handleSubmit;
  }

  //собирает данные всех полей формы
  _getInputValues(){
    this._objectUserInput = {};
    this._inputs.forEach((input)=>{
        this._objectUserInput[input.name] = input.value;
    });
    return this._objectUserInput;
  }

  //Submit формы
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(evt);
      this._renderLoading(true);
      this._handleSubmit(this._getInputValues());
      this._renderLoading(false);
      this.close();
    });
  }

  //изменение текста кнопки при ожидании ответа от сервера
  _renderLoading(isLoading){
    if(isLoading){
      this._button.textContent = 'Сохранение...';
    }else{
      if(this._popup === document.querySelector('.popup_type_mesto')){
        this._button.textContent = 'Создать'
      }else{
        this._button.textContent = 'Сохранить'
      }
    }
  }

  //закрыть попап
  close(){
    super.close()
    this._form.reset();//очищает поля формы после закрытия
  }

}

