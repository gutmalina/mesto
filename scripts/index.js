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


//публикация карточки из попап новое место
function renderNewCardMesto (element) {
  const card = new Card(linkInputMesto.value, nameInputMesto.value);
  const cardElement = card.generateCard();

  document.querySelector('.group-cards').prepend(cardElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function setClosePopupListeners(){//закрыть попап кликом по оверлей или крестик
  const popups = document.querySelectorAll('.popup')
      popups.forEach((popup) => {
          popup.addEventListener('mousedown', (evt) => {
              if (evt.target.classList.contains('popup_opened')) {
                  closePopup(popup);};
          });
          const button = popup.querySelector('.popup__close');
          button.addEventListener('mousedown', () => closePopup(popup));
    });
};

setClosePopupListeners()

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

function handleMestoFormSubmit (event) {
  event.preventDefault();
  renderNewCardMesto();
  closePopupMesto();
  event.target.reset();
  event.submitter.setAttribute('disabled', '');
  event.submitter.classList.add('button_style_save-invalid');
}

mestoForm.addEventListener('submit', handleMestoFormSubmit);
