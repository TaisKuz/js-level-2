'use strict';

// JS-level-2
// homework-1
// task-1, task-2

(function (d) {
    d.onreadystatechange = () => {
        if (d.readyState === "complete") {

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

            // task-1
            // Улучшить базовый класс, добавив в него общий для всех метод remove(),
            // который удаляет контейнер.
            Container.prototype.remove = function() {
                const container = d.querySelector(`#${this.id}`);

                if (container)
                    console.log(`${this.id} was removed`);
                    container.remove();
            };

            const box = new Container('box', 'box', 'I am a box', 'div');
            const xbox = new Container('xbox', 'xbox', 'I am an xbox', 'div');

            d.write(box.render(), xbox.render());

            box.remove();
        }
    }
})(document);
