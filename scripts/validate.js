function enableValidation(form) {//проверка ПОЛЕЙ формы и включение/выключение кнопки
  const inputs = form.querySelectorAll('.popup__input');
  const button = form.querySelector('.button-submit');
  checkButtonValidity(form, button);
  inputs.forEach(function(input){
    input.addEventListener('input', function(){
    checkInputValidity(form, input);
    checkButtonValidity(form, button);
    });
  });
}

function setFormListener(){
  const forms = document.querySelectorAll('.form');
  forms.forEach(function(form){
    function formSubmit(event) {//функция отправки формы
      event.preventDefault(event);
    }
    enableValidation(form);
  });
}
setFormListener({
  form: '.form',
  input: '.popup__input',
  button: '.button-submit'
})
