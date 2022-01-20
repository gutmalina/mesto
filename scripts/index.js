
const profileOpenPopupButton = document.querySelector('.profile__edit') //переменна кнопки Редактировать
const popup = document.querySelector('.popup') //переменная формы Попап
const popupCloseButton = document.querySelector('.popup__close') //переменная кнопки Закрыть

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

const popupSaveButton = document.querySelector('.popup__save')//перменная кнопки Сохранить
let NameInput = popup.querySelector('.popup__input_name') // переменна Имя в форме Попап
let JobInput = popup.querySelector('.popup__input_job') // переменна работа в форме Попап

let NameProfile = document.querySelector('.profile__info-title') //переменная Текст имени
let JobProfile = document.querySelector('.profile__info-subtitle') // переменная Текст работа

NameInput.getAttribute('value')//получить значение имени из формы попап
JobInput.getAttribute('value')//получить значение работа из формы попап


function savePopup () {//функция изменения текста в профиле и закрыть попап
  NameProfile.textContent = NameInput.value;//вставить значения из попап в текст профиля
  JobProfile.textContent = JobInput.value;//вставить значения из попап в текст профиля
  popup.classList.remove('popup_opened') // функция ЗАКРЫТЬ ПОПАП  
}

 popupSaveButton.addEventListener('click', savePopup)//клик по кнопке Сохранить - закроет форму попап и сохранит текст в профиль