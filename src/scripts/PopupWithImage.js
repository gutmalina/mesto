import { imgPopupImage, captionPopupImage } from "./index.js";
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{
  constructor(popupSelector, link, name){
    super(popupSelector);
     this._link = link;
     this._name = name;

  }

  open(){
    super.open()
    imgPopupImage.src = this._link;
    captionPopupImage.textContent = this._name;
    imgPopupImage.alt = this._name;
  }

}
