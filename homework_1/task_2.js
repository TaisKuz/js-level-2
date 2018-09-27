'use strict';

// JS-level-2
// homework-1
// task-1

(function (d) {
    d.onreadystatechange = () => {
        if (d.readyState === "complete") {

            const mainContant = d.querySelector('#main-contant');

            // базовый класс Container
            class Container {
                constructor(id, className, content, htmlCode) {
                    this.content = content;
                    this.id = id;
                    this.className = className;
                    this.htmlCode = htmlCode;
                }

                render() {
                    console.log(`${this.id} is added`);
                    const htmlCode = `<${this.htmlCode} id="${this.id}" class="${this.className}">${this.content}</${this.htmlCode}>`
                    return htmlCode;
                }
            };

            class Menu extends Container {
                constructor(id, className, menuTitle, items) {
                    super();
                    this.id = id;
                    this.className = className;
                    this.menuTitle = menuTitle;
                    this.items = items;
                }

                render() {
                    if (this.items.lenght == 0) return;

                    let menuListq = d.createElement('ul');
                    menuListq.classList.add(this.className);
                    console.log('menuList', menuListq);
                    let menuList = `<ul class="${this.className}" id="${this.id}">`;

                    for (let item in this.items) {
                        if (this.items[item] instanceof MenuItem) {
                            menuList += this.items[item].render();
                        }
                    }
                    menuList += `</ul>`;
                    return menuList;
                };
            };

            class MenuItem extends Menu {
                constructor(href, itemTitle) {
                    super();
                    this.className = "menu-item";
                    this.href = href;
                    this.itemTitle = itemTitle;
                }

                render() {
                    return `<li class="${this.className}" href="${this.href}">${this.itemTitle}</li>`;
                }

            };

            let menuItem1_1 = new MenuItem("/", "Главная");
            let menuItem1_2 = new MenuItem("/catalogue/", "Каталог");
            let menuItem1_3 = new MenuItem("/gallery/", "Галерея");
            let menuItems1 = { 0: menuItem1_1, 1: menuItem1_2, 2: menuItem1_3 };

            // task-2
            // Создать наследника класса Menu – новый класс должен уметь
            // строить меню со вложенными пунктами, т.е с подменю.
            // Подсказка: главный секрет в обходе объекта пунктов меню и проверке типов.
            class MenuWithSubItems extends Menu {
                constructor(id, className, menuItems) {
                    super();
                    this.id = id;
                    this.className = className;
                    this.menuItems = menuItems;
                }

                render() {
                    if (this.menuItems.lenght == 0) return;

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
                }
            };

            let menuItem2_1 = new MenuItem("/location/", "Адрес");
            let menuItem2_2 = new MenuItem("/about/", "О компании");
            let menuItems2 = { 0: menuItem2_1, 1: menuItem2_2 };

            let submenu1 = new Menu("submenu-1", "submenu-item", "Главная", menuItems1);
            let submenu2 = new Menu("submenu-2", "submenu-item", "О компании", menuItems2);
            let menuItems = { 0: submenu1, 1: submenu2 };

            let menuWithSubItems = new MenuWithSubItems("menu-with-submenus", "menu-with-submenus", menuItems);

            d.write(menuWithSubItems.render());
        }
    }
})(document);
