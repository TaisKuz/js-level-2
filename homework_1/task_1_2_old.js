// JS-level-2
// homework-1
// task-1, task-2

// решение task-1, task-2 без использования class

// базовый класс Container
function Container(id, className, htmlCode) {
    this.id = id;
    this.className = className;
    this.htmlCode = htmlCode;
};

Container.prototype.render = function () {
    return this.htmlCode;
};

// task-1. Улучшить базовый класс, добавив в него общий для всех метод remove(),
// который удаляет контейнер.
Container.prototype.remove = function () { this.htmlCode = "" };

function MenuItem(href, itemTitle) {
    Container.call(this);

    this.className = "menu-item";
    this.href = href;
    this.itemTitle = itemTitle;
};

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
    return `<li class="${this.className}" href="${this.href}">${this.itemTitle}</li>`;
};

function Menu(id, className, menuTitle, items) {
    Container.call(this);

    this.id = id;
    this.className = className;
    this.menuTitle = menuTitle;
    this.items = items;
};

// как лучше наследовать класс 1) или 2) ?
// 1)
Menu.prototype = Object.create(Container.prototype);

// в чем смысл строчки ниже?
// зачем опять добавлять в constructor Menu ?
Menu.prototype.constructor = Menu;

// 2)
// разве в данном случае мы не передаем объекту constructor ?
// Menu.prototype.__proto__ = Container.prototype;

Menu.prototype.render = function () {
    let menuList = `<ul class="${this.className}" id="${this.id}">`;
    for (let item in this.items) {
        if (this.items[item] instanceof MenuItem) {
            menuList += this.items[item].render();
        }
    }
    menuList += `</ul>`;
    return menuList;
};

let menuItem1_1 = new MenuItem("/", "Главная");
let menuItem1_2 = new MenuItem("/catalogue/", "Каталог");
let menuItem1_3 = new MenuItem("/gallery/", "Галерея");
let menuItems1 = { 0: menuItem1_1, 1: menuItem1_2, 2: menuItem1_3 };

// task-2. Создать наследника класса Menu – новый класс должен уметь
// строить меню со вложенными пунктами, т.е с подменю.
// Подсказка: главный секрет в обходе объекта пунктов меню и проверке типов.

function MenuWithSubItems(id, className, menuItems) {
    Menu.call(this);

    this.id = id;
    this.className = className;
    this.menuItems = menuItems;
};

MenuWithSubItems.prototype.__proto__ = Menu.prototype;

MenuWithSubItems.prototype.render = function () {

    let menuWithSubItems = `<ul class="${this.className}" id="${this.id}">`;

    for (let menuItem in this.menuItems) {
        menuWithSubItems += `<li class="${menuItem.className}">${this.menuItems[menuItem].menuTitle}`;

        if (this.menuItems[menuItem] instanceof Menu) {
            menuWithSubItems += this.menuItems[menuItem].render();
        }
        menuWithSubItems += `</li>`;
    }

    menuWithSubItems += `</ul>`;
    return menuWithSubItems;
};

let menuItem2_1 = new MenuItem("/location/", "Адрес");
let menuItem2_2 = new MenuItem("/about/", "О компании");
let menuItems2 = { 0: menuItem2_1, 1: menuItem2_2 };

let submenu1 = new Menu("submenu-1", "submenu-item", "Главная", menuItems1);
let submenu2 = new Menu("submenu-2", "submenu-item", "О компании", menuItems2);
let menuItems = { 0: submenu1, 1: submenu2 };
let menuWithSubItems = new MenuWithSubItems("menu-with-submenus", "menu-with-submenus", menuItems);

let div = document.write(menuWithSubItems.render());
