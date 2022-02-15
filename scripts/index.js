const cardTemplate = document.querySelector('#card_template').content;
const groupCards = document.querySelector('.group-cards');
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileOpenButton = document.querySelector('.button_type_edit-profile');
const profileForm = document.querySelector('.form-profile');
const nameInput = profileForm.querySelector('.popup__input_edit_name');
const jobInput = profileForm.querySelector('.popup__input_edit_job');
const nameProfile = document.querySelector('.profile__info-title');
const jobProfile = document.querySelector('.profile__info-subtitle');
const popupMesto = document.querySelector('.popup_type_mesto');
const popupMestoOpenButton = document.querySelector('.button_type_add-profile');
const mestoForm = document.querySelector('.form-mesto');
const nameInputMesto = mestoForm.querySelector('.popup__input_foto_name');
const linkInputMesto = mestoForm.querySelector('.popup__input_foto_link');
const popupImage = document.querySelector('.popup_type_image');
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
  newCardImg.addEventListener('click', () => handleCardClick(item));
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
  document.addEventListener('keydown', closeByEscape);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function setClosePopup(){//закрыть попап кликом по оверлей или крестик
  const popups = document.querySelectorAll('.popup')
      popups.forEach((popup) => {
          popup.addEventListener('mousedown', (evt) => {
              if (evt.target.classList.contains('popup_opened')) {
                  closePopup(popup);};
          });
          const button = popup.querySelector('.popup__close')
          button.addEventListener('mousedown', () => {
            if (popup.classList.contains('popup_opened')) {
                closePopup(popup);};
          });
      });
};

setClosePopup()

function closeByEscape(evt) {//закрыть попап по Esc, слушатель вешается в openPopup, удаляется в closePopup
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
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

function closePopupMesto () {
  closePopup(popupMesto);
}

popupMestoOpenButton.addEventListener('click', openPopupMesto);

function renderNewCardMesto (element) {
  const newCardMesto = createCard({name: nameInputMesto.value, link: linkInputMesto.value });
  groupCards.prepend(newCardMesto);
}

function handleMestoFormSubmit (event) {
  event.preventDefault();
  renderNewCardMesto();
  closePopupMesto();
  event.target.reset();
}
mestoForm.addEventListener('submit', handleMestoFormSubmit);

function handleCardClick(item){
   openPopup(popupImage);
   imgPopupImage.src = item.link;
   imgCaptionPopupImage.textContent = item.name;
   imgPopupImage.alt = item.name;
}

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
