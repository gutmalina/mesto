
const profileOpenPopupButton = document.querySelector('.button_type_edit-profile') //переменна кнопки Редактировать
const popup = document.querySelector('.popup') //переменная формы Попап
const popupCloseButton = document.querySelector('.button_type_close-popup') //переменная кнопки Закрыть

function openPopup() {
  popup.classList.add('popup_opened') // функция ОТКРЫТЬ ПОПАП
  NameInput.value = NameProfile.innerText//вставить текст в имя попап
  JobInput.value = JobProfile.innerText//вставить текст в работа попап
}
function closePopup() {
  popup.classList.remove('popup_opened') // функция ЗАКРЫТЬ ПОПАП
}

profileOpenPopupButton.addEventListener('click', openPopup,) //клик по кнопке Редактировать
popupCloseButton.addEventListener('click', closePopup) //клик по кнопке Закрыть


let formElement = document.querySelector('.form') // переменная формы с именем и работой
let NameInput = formElement.querySelector('.popup__input_edit_name') // переменна Имя в форме Попап
let JobInput = formElement.querySelector('.popup__input_edit_job') // переменна работа в форме Попап
const popupSaveButton = formElement.querySelector('.button_type_save-popup')//перменная кнопки Сохранить
let NameProfile = document.querySelector('.profile__info-title') //переменная Текст имени
let JobProfile = document.querySelector('.profile__info-subtitle') // переменная Текст работа

NameInput.getAttribute('value')//получить значение имени из формы попап
JobInput.getAttribute('value')//получить значение работа из формы попап

popupSaveButton.addEventListener('click', formSubmitHandler) //клик по кнопке Сохранить - закроет форму попап и сохранит текст в профиль и отправит данные


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {//функция изменения текста в профиле и закрыть попап и отправить данные
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  NameProfile.textContent = NameInput.value;//вставить значения из попап в текст профиля
  JobProfile.textContent = JobInput.value;//вставить значения из попап в текст профиля
  closePopup() // функция ЗАКРЫТЬ ПОПАП
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
