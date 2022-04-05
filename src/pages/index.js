import '../pages/index.css';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';

//объект для создания карточек
export const objectSelector = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: 'span_active',
  buttonSubmitSelector: '.button-submit',
  buttonDisabledClass: 'button_style_save-invalid',
};
//объект с данными профиля со страницы
export const objectUserInfoSelector = {
  nameInfoSelector: '.profile__info-title',
  jobInfoSelector: '.profile__info-subtitle',
  avatarInfoSelector: '.profile__avatar',
}

//попапы
const popupProfile = document.querySelector('.popup_type_profile');
const popupMesto = document.querySelector('.popup_type_mesto');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupDelete = document.querySelector('.popup_type_delete');
//формы
const profileForm = document.querySelector('.form_profile');
const mestoForm = document.querySelector('.form_mesto');
const avatarForm = document.querySelector('.form_avatar');
//кнопки
const popupProfileOpenButton = document.querySelector('.button_type_edit-profile');
const popupMestoOpenButton = document.querySelector('.button_type_add-profile');
const popupAvatarOpenButton = document.querySelector('.button_type_avatar-profile');
//поля с данными профиля из попап Профиль
const nameInput = profileForm.querySelector('.popup__input_edit_name');
const jobInput = profileForm.querySelector('.popup__input_edit_job');

//класс FormValidator
const formProfileValidator = new FormValidator (profileForm, objectSelector);
const formMestoValidator = new FormValidator (mestoForm, objectSelector);
const formAvatarValidator = new FormValidator(avatarForm, objectSelector);

//класс PopupWithForm, PopupWithConfirmation
const popupProfileWithForm = new PopupWithForm( popupProfile,
  (objectUserInput) => {
    api.editProfile(objectUserInput.name, objectUserInput.job)//передает новые данные профиля на сервер
      .then(res => {
      userInfo.setUserInfo(objectUserInput.name, objectUserInput.job);
    })
});
const popupMestoWithForm = new PopupWithForm( popupMesto,
  (objectUserInput) => {
    api.addCard(objectUserInput.name, objectUserInput.link)//передает новую карточку на сервер
      .then(res => {
      renderer(res, userId);
      })
    formMestoValidator.addButtonState();//сделать кнопку не активной
  });
const popupAvatarWithForm = new PopupWithForm( popupAvatar,
  (objectUserInput) => {
    api.editAvatar(objectUserInput.link)//передает новую карточку на сервер
      .then(res => {
      userInfo.setUserAvatar(res.avatar);//устанавливает аватар на страницу
      })
    formAvatarValidator.addButtonState();//сделать кнопку не активной
  });
const popupWithConfirmation = new PopupWithConfirmation(popupDelete, (id) => {
    api.deleteCard(id)
      .then(res => {})
});

//класс PopupWithImage
const popupWithImage = new PopupWithImage(popupImage);
//класс UserInfo
const userInfo = new UserInfo(objectUserInfoSelector);
//класс Section
const section = new Section({data: [], renderer}, '.group-cards');

//класс Сервер
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '1644d6d3-d402-48a7-a47b-050c577645a3',
    'Content-Type': 'application/json'
  }
});

//Сервер, получить данные профиля
api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about);
    userId = res._id;
    userInfo.setUserAvatar(res.avatar)
  });
//Сервер, получить данные карточек
api.getCards()
  .then(cardList => {
    userId = userId;
    cardList.forEach(item => {
      renderer(item, userId);
    })
  });

//присвоить значение id пользователя при получении ответа от сервера
let userId;

//создание карточки
const renderer = (item, userId) => {
  const card = new Card(
    userId,
    item,
    '.card-template_type_default',
    (link, name) => {//открыть попап картинка
      popupWithImage.open(link, name);
    },
    (id, element) => {//открыть попап для удаления карточки
      popupWithConfirmation.open();
      popupWithConfirmation.setEventListeners(id, element);
    },
    (id) => {//установить-удалить лайк
      if(card.isLiked()){
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes);
        });
      }else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes);
          });
        };
    }
  );
  const cardElement = card.generateCard();//создает карточку на основе переданных данных
  section.addItem(cardElement);//вставляет каорточку в ДОМ
}

//отрисовка каждой отдельной карточки
section.renderItems();

//обработчики для открытия попапов
popupProfileOpenButton.addEventListener('click', () =>{
  popupProfileWithForm.open();
  const objectUserInfo = userInfo.getUserInfo();
  nameInput.value = objectUserInfo.nameInfo;
  jobInput.value = objectUserInfo.jobInfo;
  formProfileValidator.removeErrorPopupOpen();
});
popupMestoOpenButton.addEventListener('click', () => {
  popupMestoWithForm.open();
  formMestoValidator.removeErrorPopupOpen();
});
popupAvatarOpenButton.addEventListener('click', () => {
  const popupAvatarOpen = new Popup(popupAvatar);
  popupAvatarOpen.open();
  formAvatarValidator.removeErrorPopupOpen();
});

//вызов валидации полей формы
formProfileValidator.enableValidation();
formMestoValidator.enableValidation();
formAvatarValidator.enableValidation();

//вызов Submit формы
popupProfileWithForm.setEventListeners();
popupMestoWithForm.setEventListeners();
popupAvatarWithForm.setEventListeners();

//вызов Close формы по оверлею и крестику
popupWithImage.setEventListeners();
