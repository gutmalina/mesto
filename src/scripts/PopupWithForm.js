import { Popup } from './Popup.js';
import { objectSelector} from "./index.js";
import { FormValidator } from './FormValidator.js';

export class PopupWithForm extends Popup{//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  constructor(popupSelector, handleSubmit){
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleSubmit = handleSubmit;
  }

  open(){
    super.open();
    const formValidator = new FormValidator (this._form, objectSelector);
    formValidator.removeErrorPopupOpen();//удалить стиль ошибок при открытии попап
  }

  _getInputValues(){//собирает данные всех полей формы
    const nameInput = this._form.querySelector('.popup__input_edit_name').value;
    const jobInput = this._form.querySelector('.popup__input_edit_job').value;
    return {nameInput, jobInput};
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {//добавлять обработчик сабмита формы
      evt.preventDefault(evt);
      this._handleSubmit();
      this.close();
    });
  }

  close(){//Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
    super.close()
    this._form.reset();//очищает поля формы после закрытия
  }

}
