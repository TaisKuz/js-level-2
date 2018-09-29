'use strict';

// JS-level-2
// homework-1
// task-2

// Создать наследника класса Menu – новый класс должен уметь
// строить меню со вложенными пунктами, т.е с подменю.
// Подсказка: главный секрет в обходе объекта пунктов меню и проверке типов.

(function (d) {
  d.onreadystatechange = () => {
    if (d.readyState === "complete") {
      const mainContent = d.querySelector('#main-content-2');

      // базовый класс Container
      class Container {
        constructor(id, className, content, nodeType) {
          this.content = content;
          this.id = id;
          this.className = className;
          this.nodeType = nodeType;
        }

        render() {
          let node = d.createElement(this.nodeType);
          node.setAttribute('id', this.id);
          node.setAttribute('class', this.className);
          const nodeContent = document.createTextNode(this.content);
          node.appendChild(nodeContent);

          if (mainContent) {
            mainContent.appendChild(node);
            console.log(`${this.id} is added`);
          }
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
          
          let menuList = d.createElement('ul');
          menuList.setAttribute('id', this.id);
          menuList.classList.add(this.className);

          this.items.forEach(item => {
            menuList.appendChild(item.render())
          });

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
          let menuItem = d.createElement('li');
          menuItem.classList.add(this.className);
          menuItem.setAttribute('href', this.href);
          const nodeContent = document.createTextNode(this.itemTitle);
          menuItem.appendChild(nodeContent);

          return menuItem;          
        }
      };

      let menuItem1_1 = new MenuItem("/", "Главная");
      let menuItem1_2 = new MenuItem("/catalogue/", "Каталог");
      let menuItem1_3 = new MenuItem("/gallery/", "Галерея");
      let menuItems1 = [menuItem1_1, menuItem1_2, menuItem1_3];

      // решение task-2
      // Создать наследника класса Menu – новый класс должен уметь
      // строить меню со вложенными пунктами, т.е с подменю.

      class MenuWithSubItems extends Menu {
        constructor(id, className, menuItems) {
          super();
          this.id = id;
          this.className = className;
          this.menuItems = menuItems;
        }

        render() {
          if (this.menuItems.lenght == 0) return;

          let menuWithSubItems = d.createElement('ul');
          menuWithSubItems.classList.add(this.className);
          menuWithSubItems.setAttribute('id', this.id);

          this.menuItems.forEach(item => {
            let newSubMenuItem = item.render()

            if (item instanceof Menu) {
              newSubMenuItem = d.createElement('li');

              if (item.menuTitle) {
                const nodeContent = document.createTextNode(item.menuTitle);
                newSubMenuItem.appendChild(nodeContent);   
              }
              newSubMenuItem.appendChild(item.render())
            }
            menuWithSubItems.appendChild(newSubMenuItem)
          });

          return menuWithSubItems;
        }
      };

      let menuItem2_1 = new MenuItem("/location/", "Адрес");
      let menuItem2_2 = new MenuItem("/about/", "О компании");
      let menuItems2 = [menuItem2_1, menuItem2_2];

      let submenu1 = new Menu("submenu-1", "submenu-item", "Главная", menuItems1);
      let submenu2 = new Menu("submenu-2", "submenu-item", "О компании", menuItems2);
      let menuItems = [submenu1, submenu2];

      let menuWithSubItems = new MenuWithSubItems("menu-with-submenus", "menu-with-submenus", menuItems);
      
      mainContent.appendChild(menuWithSubItems.render())
    }
  }
})(document);
