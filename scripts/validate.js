function showInputError({spanErrorClass, inputErrorClass}, form, input, errorMessage) {//показать стиль ошибки
  const spanError = form.querySelector(`.span_${input.id}`);
  input.classList.add(inputErrorClass);
  spanError.classList.add(spanErrorClass);
  spanError.textContent = input.validationMessage;
};

function hideInputError({spanErrorClass, inputErrorClass}, form, input) {//удалить стиль ошибки
  const spanError = form.querySelector(`.span_${input.id}`);
  input.classList.remove(inputErrorClass);
  spanError.classList.remove(spanErrorClass);
  spanError.textContent = '';
};

function checkInputValidity(rest, form, input) {//проверка Валидности полей, показать или удалить стиль ошибки
  if(input.validity.valid){
    hideInputError(rest, form, input);
  } else {
    showInputError(rest, form, input, input.validationMessage);
    };
}

function setEventListeners({inputSelector, buttonSubmitSelector, buttonDisabledClass, ...rest}, form) {//проверка Валидности input и функции изменении disabled button
  const inputs = form.querySelectorAll(inputSelector);
  const button = form.querySelector(buttonSubmitSelector);
  toggleButtonState(buttonDisabledClass, form, button);
  inputs.forEach(function(input){
    input.addEventListener('input', function(){
    checkInputValidity(rest, form, input);
    toggleButtonState(buttonDisabledClass, form, button);
    });
  });
}

function enableValidation({formSelector, ...rest}){//обработка submit у определенной формы и запуск функции Валидности input + button
  const forms = document.querySelectorAll(formSelector);
  forms.forEach(function(form){
    function formSubmit(event) {
      event.preventDefault(event);
    }
    setEventListeners(rest, form);
  });
}


function toggleButtonState(buttonDisabledClass, form, button) {//изменении disabled button
  if(form.checkValidity()){
    button.removeAttribute('disabled', '');
    button.classList.remove(buttonDisabledClass)
  }else {
    button.setAttribute('disabled', '');
    button.classList.add(buttonDisabledClass);
  };
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'span_active',
  buttonSubmitSelector: '.button-submit',
  buttonDisabledClass: 'button_style_save-invalid',
});
