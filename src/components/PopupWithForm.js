import { Popup } from './Popup.js';

export class PopupWithForm extends Popup{//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  constructor(popupSelector, handleSubmit){
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleSubmit = handleSubmit;
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues(){//собирает данные всех полей формы
    this._objectUserInput = {};
    this._inputs.forEach((input)=>{
        this._objectUserInput[input.name] = input.value;
    });
    return this._objectUserInput;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {//добавлять обработчик сабмита формы
      evt.preventDefault(evt);
      this._handleSubmit(this._getInputValues());
      this.close();
    });
  }

  close(){//Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
    super.close()
    this._form.reset();//очищает поля формы после закрытия
  }

}
