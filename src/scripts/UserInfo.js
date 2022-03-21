import { nameInput, jobInput } from "./index.js";

export class UserInfo {
  constructor(data){
    this._nameInfo = document.querySelector(data.nameInfoSelector);//данные со страницы
    this._jobInfo = document.querySelector(data.jobInfoSelector);//данные со страницы
  }

  getUserInfo(){//возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
    nameInput.value = this._nameInfo.innerText;//передача данных от страницы в форму, нужно при открытии попапа
    jobInput.value = this._jobInfo.innerText;
  }

  setUserInfo(){//принимает новые данные пользователя и добавляет их на страницу
    this._nameInfo.textContent = nameInput.value;//передача новых данных из формы на страницу при сабмите
    this._jobInfo.textContent = jobInput.value;
  }

}
