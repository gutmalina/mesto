import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../scripts/initialCards.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileOpenButton = document.querySelector('.button_type_edit-profile');
export const profileForm = document.querySelector('.form_profile');
export const nameInput = profileForm.querySelector('.popup__input_edit_name');
export const jobInput = profileForm.querySelector('.popup__input_edit_job');
const popupMesto = document.querySelector('.popup_type_mesto');
const popupMestoOpenButton = document.querySelector('.button_type_add-profile');
const mestoForm = document.querySelector('.form_mesto');
export const nameInputMesto = mestoForm.querySelector('.popup__input_foto_name');
export const linkInputMesto = mestoForm.querySelector('.popup__input_foto_link');
export const popupImage = document.querySelector('.popup_type_image');

export const objectSelector = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'span_active',
  buttonSubmitSelector: '.button-submit',
  buttonDisabledClass: 'button_style_save-invalid',
};

export const objectUserInfoSelector = {
  nameInfoSelector: '.profile__info-title',
  jobInfoSelector: '.profile__info-subtitle',
}

const section = new Section({data: initialCards, renderer}, '.group-cards');
section.renderItems();

function renderer (item){
  const card = new Card(item.link, item.name, '.card-template_type_default', handleCardClick);
  const cardElement = card.generateCard();//создает карточку на основе переданных данных
  section.addItem(cardElement);//вставляет каорточку в ДОМ
}

const formProfileValidator = new FormValidator (profileForm, objectSelector);//проверка полей формы Профиль
formProfileValidator.enableValidation();

const formMestoValidator = new FormValidator (mestoForm, objectSelector);//проверка полей формы Место
formMestoValidator.enableValidation();

const userInfo = new UserInfo(objectUserInfoSelector);

//открыть попап Профиль
popupProfileOpenButton.addEventListener('click', () =>{//слушатель кнопки редактировать профиль
  popupProfileSubmit.open();
  const objectUserInfo = userInfo.getUserInfo();//передача данных от страницы в форму
  nameInput.value = objectUserInfo.nameInfo;
  jobInput.value = objectUserInfo.jobInfo;
  formProfileValidator.removeErrorPopupOpen();//удалить стиль ошибок при открытии попап
});

//открыть попап Место
popupMestoOpenButton.addEventListener('click', () => {//слушатель кнопки добавить новое место
  popupMestoSubmit.open();
  formMestoValidator.removeErrorPopupOpen();//удалить стиль ошибок при открытии попап
});

//открыть попап картинка
function handleCardClick(link, name){
  popupImageOpenClose.open(link, name);
}

const popupImageOpenClose = new PopupWithImage(popupImage);//закрыть форму по оверлею и крестику
popupImageOpenClose.setEventListeners();

//Submit формы Профиль
const popupProfileSubmit = new PopupWithForm( popupProfile,
  (objectUserInput) => {
  userInfo.setUserInfo(objectUserInput);//передача новых данных из формы на страницу
  });
popupProfileSubmit.setEventListeners();

//Submit формы Место
const popupMestoSubmit = new PopupWithForm( popupMesto,
  (objectUserInput) => {
    renderer(objectUserInput);
    formMestoValidator.addButtonState();
  });
popupMestoSubmit.setEventListeners();


