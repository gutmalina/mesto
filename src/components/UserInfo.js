export class UserInfo {
  constructor(data){
    this._nameInfo = document.querySelector(data.nameInfoSelector);//данные со страницы
    this._jobInfo = document.querySelector(data.jobInfoSelector);//данные со страницы
  }

  getUserInfo(){//возвращает объект с данными пользователя - подставить в форму при открытии
    const nameInfo = this._nameInfo.innerText;
    const jobInfo = this._jobInfo.innerText;
    return {nameInfo, jobInfo};
  }

  setUserInfo(objectUserInput){//принимает новые данные пользователя и добавляет их на страницу
    this._nameInfo.textContent = objectUserInput.name;//передача новых данных из формы на страницу при сабмите
    this._jobInfo.textContent = objectUserInput.job;
  }

}
