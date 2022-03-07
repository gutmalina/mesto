class FormValidator{
  constructor(form, button, input, span){
    this._form = form;
    this._button = button;
    this._input = input;
    this._span = span;
  }

  enableValidation({formSelector, buttonSubmitSelector, ...rest}){//обработка submit у определенной формы и запуск функции Валидности input + button
    const forms = document.querySelectorAll(formSelector);
    forms.forEach(function(form){
      function formSubmit(event) {
        event.preventDefault(event);
      }
      const button = form.querySelector(buttonSubmitSelector);
      const validation = new FormValidator(form, button);
      validation._setEventListeners(rest, form, button);
    });
  }

  _setEventListeners({inputSelector, buttonSubmitSelector, buttonDisabledClass, ...rest}, form, button) {//проверка Валидности input и функции изменении disabled button
    const inputs = this._form.querySelectorAll(inputSelector);
    this._toggleButtonState(buttonDisabledClass, form);
    inputs.forEach(function(input){
      input.addEventListener('input', function(){
        const span = document.querySelector(`.span_${input.id}`);
        const validation = new FormValidator(form, button, input, span);
        validation._checkInputValidity(rest, form, input, span);
        validation._toggleButtonState(buttonDisabledClass, form, button);
      });
    });
  }

  _checkInputValidity(rest, form, input, span){//проверка Валидности полей, показать или удалить стиль ошибки
    if(this._input.validity.valid){
      this._hideInputError(rest, form, input);
    } else {
      this._showInputError(rest, form, input, input.validationMessage);
    };
  }

  _hideInputError({spanErrorClass, inputErrorClass}, form, input){//удалить стиль ошибки
    this._input.classList.remove(inputErrorClass);
    this._span.classList.remove(spanErrorClass);
    this._span.textContent = '';
  };

  _showInputError({spanErrorClass, inputErrorClass}, form, input, errorMessage) {//показать стиль ошибки
    this._input.classList.add(inputErrorClass);
    this._span.classList.add(spanErrorClass);
    this._span.textContent = this._input.validationMessage;
  };

  _toggleButtonState(buttonDisabledClass, form, button) {//изменении disabled button
    if(this._form.checkValidity()){
      this._button.removeAttribute('disabled', '');
      this._button.classList.remove(buttonDisabledClass)
    }else {
      this._button.setAttribute('disabled', '');
      this._button.classList.add(buttonDisabledClass);
    };
  };

};

const validation = new FormValidator();
validation.enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'span_active',
  buttonSubmitSelector: '.button-submit',
  buttonDisabledClass: 'button_style_save-invalid',
});
