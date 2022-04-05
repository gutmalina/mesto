export class FormValidator{
  constructor(form, data){
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._spanErrorClass = data.spanErrorClass;
    this._buttonSubmitSelector = data.buttonSubmitSelector;
    this._buttonDisabledClass = data.buttonDisabledClass;
    this._inputs = this._form.querySelectorAll(this._inputSelector);
  }

  //запуск функции Валидности input + button
  enableValidation(){
    this._button = this._form.querySelector(this._buttonSubmitSelector);
    this._setEventListeners();
  }

  //проверка Валидности input и функции изменении disabled button
  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._input = input;
        this._span = this._form.querySelector(`.span_${this._input.id}`);
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  //проверка Валидности полей, показать или удалить стиль ошибки
  _checkInputValidity(){//проверка Валидности полей, показать или удалить стиль ошибки
    if(this._input.validity.valid){
      this._hideInputError();
    } else {
      this._showInputError();
    };
  }

  //удалить стиль ошибки
  _hideInputError(){//удалить стиль ошибки
    this._input.classList.remove(this._inputErrorClass);
    this._span.classList.remove(this._spanErrorClass);
    this._span.textContent = '';
  }

  //показать стиль ошибки
  _showInputError() {//показать стиль ошибки
    this._input.classList.add(this._inputErrorClass);
    this._span.classList.add(this._spanErrorClass);
    this._span.textContent = this._input.validationMessage;
  }

  //изменении disabled button
  _toggleButtonState() {
    if(this._form.checkValidity()){
      this._button.removeAttribute('disabled', '');
      this._button.classList.remove(this._buttonDisabledClass)
    }else {
      this.addButtonState();
    };
  }

  //disabled кнопки
  addButtonState() {
    this._button.setAttribute('disabled', '');
    this._button.classList.add(this._buttonDisabledClass);
  }

  //удалить ошибки при открытии попап Профиль
  removeErrorPopupOpen(){
    this._inputs.forEach((input) => {
      this._input = input;
      this._span = this._form.querySelector(`.span_${this._input.id}`);
      this._hideInputError();
    });
  }

};
