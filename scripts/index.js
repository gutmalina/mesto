import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileOpenButton = document.querySelector('.button_type_edit-profile');
const profileForm = document.querySelector('.form_profile');
const nameInput = profileForm.querySelector('.popup__input_edit_name');
const jobInput = profileForm.querySelector('.popup__input_edit_job');
const nameProfile = document.querySelector('.profile__info-title');
const jobProfile = document.querySelector('.profile__info-subtitle');
const popupMesto = document.querySelector('.popup_type_mesto');
const popupMestoOpenButton = document.querySelector('.button_type_add-profile');
const mestoForm = document.querySelector('.form_mesto');
const nameInputMesto = mestoForm.querySelector('.popup__input_foto_name');
const linkInputMesto = mestoForm.querySelector('.popup__input_foto_link');
export const popupImage = document.querySelector('.popup_type_image');
const forms = document.querySelectorAll('.form');
const objectSelector = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'span_active',
  buttonSubmitSelector: '.button-submit',
  buttonDisabledClass: 'button_style_save-invalid',
};

function addCard (link, name){
  const card = new Card(link, name, '.card-template_type_default');// Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.group-cards').prepend(cardElement);
};
//публикация карточки на сайте с уникальными данными из массива
initialCards.forEach((item) => {// Создадим экземпляр карточки
  addCard(item.link, item.name);
});

forms.forEach((form) => {
  const formValidator = new FormValidator(form, objectSelector);
  formValidator.enableValidation();
});

function renderNewCardMesto (element) {
  addCard(linkInputMesto.value, nameInputMesto.value);
};

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

function setClosePopupListeners(){//закрыть попап кликом по оверлей или крестик
  const popups = document.querySelectorAll('.popup')
      popups.forEach((popup) => {
          popup.addEventListener('mousedown', (evt) => {
              if (evt.target.classList.contains('popup_opened')|| evt.target.classList.contains('popup__close')) {
                  closePopup(popup);
                };
          });
    });
};

setClosePopupListeners();

function closeByEscape(evt) {//закрыть попап по Esc, слушатель вешается в openPopup, удаляется в closePopup
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

function openPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = nameProfile.innerText;
  jobInput.value = jobProfile.innerText;
};

function closePopupProfile() {
  closePopup(popupProfile);
};

popupProfileOpenButton.addEventListener('click', openPopupProfile,);

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopupProfile();
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

function openPopupMesto () {
  openPopup(popupMesto);
};

function closePopupMesto () {
  closePopup(popupMesto);
};

popupMestoOpenButton.addEventListener('click', openPopupMesto);

function handleMestoFormSubmit (event) {
  event.preventDefault();
  renderNewCardMesto();
  closePopupMesto();
  event.target.reset();
  event.submitter.setAttribute('disabled', '');
  event.submitter.classList.add('button_style_save-invalid');
};

mestoForm.addEventListener('submit', handleMestoFormSubmit);
