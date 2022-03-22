export class Section{
  constructor({data: items, renderer}, containerSelector){
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(){//перебирает массив данных и отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
    this._itemsArray.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(item){//принимает DOM-элемент и добавляет его в контейнер
    this._container.prepend(item);
  }

}
