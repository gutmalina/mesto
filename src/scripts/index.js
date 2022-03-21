import '../pages/index.css';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';

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
export const imgPopupImage = document.querySelector('.popup__image');
export const captionPopupImage = document.querySelector('.popup__image-caption');



export const objectSelector = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'span_active',
  buttonSubmitSelector: '.button-submit',
  buttonDisabledClass: 'button_style_save-invalid',
};

export const objectUserInfo = {
  nameInfoSelector: '.profile__info-title',
  jobInfoSelector: '.profile__info-subtitle',
}

const section = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item.link, item.name, '.card-template_type_default', handleCardClick);
    const cardElement = card.generateCard();//создает карточку на основе переданных данных
    section.addItem(cardElement);//вставляет каорточку в ДОМ
  },
}, '.group-cards');
section.renderItems();

const formProfileValidator = new FormValidator (profileForm, objectSelector);//проверка полей формы Профиль
formProfileValidator.enableValidation();

const formMestoValidator = new FormValidator (mestoForm, objectSelector);//проверка полей формы Место
formMestoValidator.enableValidation();


popupProfileOpenButton.addEventListener('click', () =>{//слушатель кнопки редактировать профиль
  const popup = new PopupWithForm(popupProfile);
  popup.open();
  const userInfoGet = new UserInfo(objectUserInfo);
  userInfoGet.getUserInfo();//передача данных от страницы в форму
});

popupMestoOpenButton.addEventListener('click', () => {//слушатель кнопки добавить новое место
  const popup = new PopupWithForm(popupMesto);
  popup.open();
});

function handleCardClick(link, name){//открывает попап с увеличенной карточкой
  const popup = new PopupWithImage(popupImage, link, name);
  popup.open();
}

const popupProfileClose = new Popup(popupProfile);//закрыть форму по оверлею и крестику
popupProfileClose.setEventListeners();

const popupProfileSubmit = new PopupWithForm( popupProfile,
  () => {
  const userInfoSet = new UserInfo(objectUserInfo);//передача новых данных из формы на страницу при сабмите
  userInfoSet.setUserInfo();
  });
popupProfileSubmit.setEventListeners();

const popupMestoClose = new Popup(popupMesto);//закрыть форму по оверлею и крестику
popupMestoClose.setEventListeners();

const popupMestoSubmit = new PopupWithForm( popupMesto,
  () => {
    const card = new Card(linkInputMesto.value, nameInputMesto.value, '.card-template_type_default', handleCardClick);
    const cardElement = card.generateCard();//создает карточку на основе переданных данных
    section.addItem(cardElement);//вставляет каорточку в ДОМ
    formMestoValidator.addButtonState();
  });
popupMestoSubmit.setEventListeners();

const popupImageCloseOverley = new Popup(popupImage);//закрыть форму по оверлею и крестику
popupImageCloseOverley.setEventListeners();

