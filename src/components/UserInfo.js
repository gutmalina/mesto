export class UserInfo {
  constructor(data){
    this._nameInfo = document.querySelector(data.nameInfoSelector);//данные со страницы
    this._jobInfo = document.querySelector(data.jobInfoSelector);//данные со страницы
    this._avatarInfo = document.querySelector(data.avatarInfoSelector);
  }

  //данные пользователя подставляет в форму при открытии
  getUserInfo(){
    const nameInfo = this._nameInfo.innerText;
    const jobInfo = this._jobInfo.innerText;
    return {nameInfo, jobInfo};
  }

  //данные пользователя добавляет на страницу после изменения в форме
  setUserInfo(name, job){
    this._nameInfo.textContent = name;
    this._jobInfo.textContent = job;
  }

  //аватар пользователя добавляет на страницу после изменения в форме
  setUserAvatar(link){
    this._avatarInfo.src = link;
  }

}
