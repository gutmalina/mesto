//загрузка массива при открытии сайта

const cardTemplate = document.querySelector('#card_template').content;
const groupCards = document.querySelector('.group-cards');

const initialCards = [
  {
    name: 'Московская область. Озеро в Лесу',
    link: './images/MO.jpg'
  },
  {
    name: 'Мыс Острый, Сахалинская область',
    link: './images/mysOstryj.jpg'
  },
  {
    name: 'Судак, Крым, берег Черного моря',
    link: './images/SudakKrym.jpg'
  },
  {
    name: 'Куршская коса, берег Балтийского моря',
    link: './images/KurshskayKosa.jpg'
  },
  {
    name: 'Владивосток. Скалы в бирюзовой лагуне',
    link: './images/Vladivostok.jpg'
  },
  {
    name: 'Самара, река Волга',
    link: './images/Samara.jpg'
  }
]

function render() {
  initialCards.forEach(renderInitialCards);
}
function renderInitialCards(element) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.card__text').innerText = element.name;
  newCard.querySelector('.card__img').src = element.link;
  newCard.querySelector('.button_type_like').addEventListener('click', likeCard);
  newCard.querySelector('.button_type_delete-card').addEventListener('click', deleteCard);
  newCard.querySelector('.card__img').addEventListener('click', popupOpenImage);
  groupCards.appendChild(newCard);
};

render();

function deleteCard(event){
  event.target.closest('.card').remove();
}

function likeCard(event) {
  event.target.classList.toggle('button_active-like');
}


//открыть и закрыть попап профиль, редактировать данные профиля, загрузка текста в момент открытия попап
const profileOpenPopupButton = document.querySelector('.button_type_edit-profile');
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileCloseButton = document.querySelector('.button_type_close-profile');

function openPopupProfile() {
  popupProfile.classList.add('popup__opened');
  NameInput.value = NameProfile.innerText;
  JobInput.value = JobProfile.innerText;
}
function closePopupProfile() {
  popupProfile.classList.remove('popup__opened');
}

profileOpenPopupButton.addEventListener('click', openPopupProfile,);
popupProfileCloseButton.addEventListener('click', closePopupProfile);


let formElement = document.querySelector('.form-profile');
let NameInput = formElement.querySelector('.popup__input_edit_name');
let JobInput = formElement.querySelector('.popup__input_edit_job');
const popupSaveButton = formElement.querySelector('.button_type_save-profile');
let NameProfile = document.querySelector('.profile__info-title');
let JobProfile = document.querySelector('.profile__info-subtitle');
NameInput.getAttribute('value');
JobInput.getAttribute('value');
popupSaveButton.addEventListener('click', formSubmitHandler);

function formSubmitHandler (evt) {
  evt.preventDefault();
  NameProfile.textContent = NameInput.value;
  JobProfile.textContent = JobInput.value;
  closePopupProfile();
}

formElement.addEventListener('submit', formSubmitHandler);


//открыть и закрыть попап добавления новых карточек, добавить новые фото
const popupMesto = document.querySelector('.popup_type_mesto');
const popupMestoOpenButton = document.querySelector('.button_type_add-profile');
const popupMestoCloseButton = document.querySelector('.button_type_close-mesto');

let formElementMesto = document.querySelector('.form-mesto');
let nameInputMesto = formElementMesto.querySelector('.popup__input_foto_name');
let linkInputMesto = formElementMesto.querySelector('.popup__input_foto_link');

function openPopupMesto () {
  popupMesto.classList.add('popup__opened');
}
function closePopupMesto () {
  popupMesto.classList.remove('popup__opened');
}

popupMestoOpenButton.addEventListener('click', openPopupMesto);
popupMestoCloseButton.addEventListener('click', closePopupMesto);

const popupMestoSaveButton = formElementMesto.querySelector('.button_type_save-mesto');

function renderNewCardMesto (element) {
  const newCardMesto = cardTemplate.cloneNode(true);
  newCardMesto.querySelector('.card__text').innerText = nameInputMesto.value;
  newCardMesto.querySelector('.card__img').src = linkInputMesto.value;
  newCardMesto.querySelector('.button_type_like').addEventListener('click', likeCard);
  newCardMesto.querySelector('.button_type_delete-card').addEventListener('click', deleteCard);
  newCardMesto.querySelector('.card__img').addEventListener('click', popupOpenImage);
  groupCards.prepend(newCardMesto);
}

function formSubmitHandlerMesto (event) {
  event.preventDefault();
  renderNewCardMesto();
  closePopupMesto();
}

formElementMesto.addEventListener('submit', formSubmitHandlerMesto);
popupMestoSaveButton.addEventListener('click', formSubmitHandlerMesto);

//увеличить изображение карточки
const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseButton = document.querySelector('.button_type_close-image');
let cardImage = document.querySelector('.card__img');
let img = document.querySelector('.popup__image');

function popupOpenImage (event) {
  popupImage.classList.add('popup__opened');
  const srcimg = event.target.parentNode.querySelector('.card__img').src;
  img.src = srcimg;
  const textimg = event.target.parentNode.querySelector('.card__text').innerText;
  let imgCaption = document.querySelector('.popup__image-caption');
  imgCaption.textContent = textimg;
}

function closePopupImage () {
  popupImage.classList.remove('popup__opened');
}

popupImageCloseButton.addEventListener('click', closePopupImage);
cardImage.addEventListener('click', popupOpenImage);

