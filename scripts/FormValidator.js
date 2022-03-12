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

  enableValidation(){//обработка submit у определенной формы и запуск функции Валидности input + button
    function formSubmit(event) {
        event.preventDefault(event);
      }
    this._button = this._form.querySelector(this._buttonSubmitSelector);
    this._setEventListeners();
  }

  _setEventListeners() {//проверка Валидности input и функции изменении disabled button
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

  _checkInputValidity(){//проверка Валидности полей, показать или удалить стиль ошибки
    if(this._input.validity.valid){
      this._hideInputError();
    } else {
      this._showInputError();
    };
  }

  _hideInputError(){//удалить стиль ошибки
    this._input.classList.remove(this._inputErrorClass);
    this._span.classList.remove(this._spanErrorClass);
    this._span.textContent = '';
  }

  _showInputError() {//показать стиль ошибки
    this._input.classList.add(this._inputErrorClass);
    this._span.classList.add(this._spanErrorClass);
    this._span.textContent = this._input.validationMessage;
  }

  _toggleButtonState() {//изменении disabled button
    if(this._form.checkValidity()){
      this._button.removeAttribute('disabled', '');
      this._button.classList.remove(this._buttonDisabledClass)
    }else {
      this.addButtonState();
    };
  }

  addButtonState() {
    this._button.setAttribute('disabled', '');
    this._button.classList.add(this._buttonDisabledClass);
  }

  removeErrorPopupOpen(){
    this._inputs.forEach((input) => {
      this._input = input;
      this._span = this._form.querySelector(`.span_${this._input.id}`);
      this._hideInputError(this._input, this._span);
    });
  }

};
