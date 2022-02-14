

const cardTemplate = document.querySelector('#card_template').content;
const groupCards = document.querySelector('.group-cards');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileOpenButton = document.querySelector('.button_type_edit-profile');
const popupProfileCloseButton = document.querySelector('.button_type_close-profile');
const profileForm = document.querySelector('.form-profile');
const nameInput = profileForm.querySelector('.popup__input_edit_name');
const jobInput = profileForm.querySelector('.popup__input_edit_job');
const nameProfile = document.querySelector('.profile__info-title');
const jobProfile = document.querySelector('.profile__info-subtitle');
const popupMesto = document.querySelector('.popup_type_mesto');
const popupMestoOpenButton = document.querySelector('.button_type_add-profile');
const popupMestoCloseButton = document.querySelector('.button_type_close-mesto');
const mestoForm = document.querySelector('.form-mesto');
const nameInputMesto = mestoForm.querySelector('.popup__input_foto_name');
const linkInputMesto = mestoForm.querySelector('.popup__input_foto_link');
const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseButton = document.querySelector('.button_type_close-image');
const imgPopupImage = document.querySelector('.popup__image');
const imgCaptionPopupImage = document.querySelector('.popup__image-caption');

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

function createCard (item) {
  const newCard = cardTemplate.cloneNode(true);
  const newCardImg = newCard.querySelector('.card__img');
  newCard.querySelector('.card__text').innerText = item.name;
  newCardImg.src = item.link;
  newCardImg.alt = item.name;
  newCard.querySelector('.button_type_like').addEventListener('click', likeCard);
  newCard.querySelector('.button_type_delete-card').addEventListener('click', deleteCard);
  newCardImg.addEventListener('click', openPopupImage);
  return newCard;
}
function renderInitialCards(element) {
  const newCard = createCard(element)
  groupCards.appendChild(newCard);
};
render();

function deleteCard(event){
  event.target.closest('.card').remove();
}
function likeCard(event) {
  event.target.classList.toggle('button_active-like');
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = nameProfile.innerText;
  jobInput.value = jobProfile.innerText;
}
function closePopupProfile() {
  closePopup(popupProfile);
}
popupProfileOpenButton.addEventListener('click', openPopupProfile,);
popupProfileCloseButton.addEventListener('click', closePopupProfile);

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopupProfile();
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

function openPopupMesto () {
  openPopup(popupMesto);
}
function resetInputMesto () {
  nameInputMesto.value = '';
  linkInputMesto.value = '';
}
function closePopupMesto () {
  closePopup(popupMesto);
  resetInputMesto();
}

popupMestoOpenButton.addEventListener('click', openPopupMesto);
popupMestoCloseButton.addEventListener('click', closePopupMesto);

function renderNewCardMesto (element) {
  const newCardMesto = createCard({name: nameInputMesto.value, link: linkInputMesto.value });
  groupCards.prepend(newCardMesto);
}

function handleMestoFormSubmit (event) {//обработчик события submit
  event.preventDefault();
  renderNewCardMesto();
  closePopupMesto();
}
mestoForm.addEventListener('submit', handleMestoFormSubmit);

function openPopupImage (event) {
  openPopup(popupImage);
  imgPopupImage.src = event.target.src;
  imgCaptionPopupImage.textContent = event.target.alt;
  imgPopupImage.alt = event.target.alt;
}

function closePopupImage () {
  closePopup(popupImage);
}

popupImageCloseButton.addEventListener('click', closePopupImage);

//проверяет Valid поля input
function checkInputValidity(form, input) {
  const spanError = form.querySelector(`.span__error-${input.id}`);
  if(input.validity.valid){//если не false(невалидное) то показать ошибки
    input.classList.remove('popup__input_type_error');
    spanError.classList.remove('span__error_active');
    spanError.textContent = '';
  } else {
    input.classList.add('popup__input_type_error');//подчеркивае поле красным
    spanError.classList.add('span__error_active');//активирует стиль ошибки
    spanError.textContent = input.validationMessage;//показывает текст ошибки
  };
}

function checkButtonValidity(form, button) {
  if(form.checkValidity()){
    button.removeAttribute('disabled', '');
    button.classList.remove('button_style_save-invalid')
  }else {
    button.setAttribute('disabled', '');
    button.classList.add('button_style_save-invalid')
  }
}

function closePopupListener(){//закрыть попап по клику и esc
  const popups = document.querySelectorAll('.popup');
  popups.forEach(function(popup){
    document.addEventListener('keydown', function(evt){
      if (evt.key === 'Escape'){
        closePopup(popup);};
    });
    popup.addEventListener('click', function(evt){
      if (evt.target === evt.currentTarget){
       closePopup(popup)};
      });
  });
};
closePopupListener();


