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
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupMesto = document.querySelector('.popup_type_mesto');
export const popupImage = document.querySelector('.popup_type_image');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupDelete = document.querySelector('.popup_type_delete');
//формы
export const profileForm = document.querySelector('.form_profile');
export const mestoForm = document.querySelector('.form_mesto');
export const avatarForm = document.querySelector('.form_avatar');
//кнопки
export const popupProfileOpenButton = document.querySelector('.button_type_edit-profile');
export const popupMestoOpenButton = document.querySelector('.button_type_add-profile');
export const popupAvatarOpenButton = document.querySelector('.button_type_avatar-profile');
//поля с данными профиля из попап Профиль
export const nameInput = profileForm.querySelector('.popup__input_edit_name');
export const jobInput = profileForm.querySelector('.popup__input_edit_job');

