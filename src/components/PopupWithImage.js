import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
     this._image = document.querySelector('.popup__image');
     this._caption = document.querySelector('.popup__image-caption');
  }

  //открыть попап с увеличенной карточкой
  open(link, name){
    super.open()
    this._image.src = link;
    this._caption.textContent = name;
    this._image.alt = name;
  }

}
