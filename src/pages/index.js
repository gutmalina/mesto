import '../pages/index.css';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { objectSelector, objectUserInfoSelector, popupProfile, popupMesto, popupImage, popupAvatar, popupDelete, profileForm, mestoForm, avatarForm, popupProfileOpenButton, popupMestoOpenButton, popupAvatarOpenButton, nameInput, jobInput } from '../utils/constants.js';

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
      popupProfileWithForm.close();
      formProfileValidator.addButtonState();//сделать кнопку не активной
    })
      .catch(console.log)
      .finally(() => {
        popupProfileWithForm.renderLoading(false)
      })
});
const popupMestoWithForm = new PopupWithForm( popupMesto,
  (objectUserInput) => {
    api.addCard(objectUserInput.name, objectUserInput.link)//передает новую карточку на сервер
      .then(res => {
      renderer(res, userId);
      popupMestoWithForm.close();
      formMestoValidator.addButtonState();//сделать кнопку не активной
      })
      .catch(console.log)
      .finally(() => {
        popupMestoWithForm.renderLoading(false)
      })
  });
const popupAvatarWithForm = new PopupWithForm( popupAvatar,
  (objectUserInput) => {
    api.editAvatar(objectUserInput.link)//передает новую карточку на сервер
      .then(res => {
      userInfo.setUserAvatar(res.avatar);//устанавливает аватар на страницу
      popupAvatarWithForm.close();
      formAvatarValidator.addButtonState();//сделать кнопку не активной
      })
      .catch(console.log)
      .finally(() => {
        popupAvatarWithForm.renderLoading(false)
      })
  });
const popupWithConfirmation = new PopupWithConfirmation(popupDelete,
  (id) => {
    api.deleteCard(id)
      .then(res => {
        popupWithConfirmation.deleteCard();
        popupWithConfirmation.close();
      })
      .catch(console.log)
      .finally(() => {
        popupWithConfirmation.renderLoading(false)
      })
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

//Загрузка страницы, получение данных профиля и массив карточек
Promise.all([api.getProfile(), api.getCards()])
  .then(([res, cardList]) => {
    userInfo.setUserInfo(res.name, res.about);
    userId = res._id;
    userInfo.setUserAvatar(res.avatar)
    userId = userId;
    cardList.forEach(item => {
      renderer(item, userId);
    })
  })
  .catch(err => {
    console.log(err)
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
      popupWithConfirmation.open(id, element);
    },
    (id) => {//установить-удалить лайк
      if(card.isLiked()){
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes);
        })
          .catch(console.log);
      }else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes);
          })
          .catch(console.log);
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
  popupAvatarWithForm.open();
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
popupWithConfirmation.setEventListeners();

//вызов Close формы по оверлею и крестику
popupWithImage.setEventListeners();
