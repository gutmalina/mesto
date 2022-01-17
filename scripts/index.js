// Открыть.закрыть popup/

const profileOpenPopupButton = document.querySelector('.profile__edit')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')

function openPopup() {
  popup.classList.add('popup_opened')
}
function closePopup() {
  popup.classList.remove('popup_opened')
}

profileOpenPopupButton.addEventListener('click', openPopup,)
popupCloseButton.addEventListener('click', closePopup)


// Находим форму в DOM
let formElement = document.querySelector('.form') // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_name')// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input_job')// Воспользуйтесь инструментом .querySelector()
let Profil = document.querySelector('.profile__info')
let profilName = Profil.querySelector('.profile__info-title')
let profilJob = Profil.querySelector('.profile__info-subtitle')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.// Так мы можем определить свою логику отправки.// О том, как это делать, расскажем позже.
    profilName.textContent = nameInput.getAttribute('value')
    profilJob.textContent = jobInput.getAttribute('value')
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


// сохранение данных при клике на кнопку сохранить
const popupSaveButton = document.querySelector('.popup__save')

function savePopup() {
  profilName.textContent = nameInput.getAttribute('value')
  profilJob.textContent = jobInput.getAttribute('value')
}

popupSaveButton.addEventListener('click', savePopup)
