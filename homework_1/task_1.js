'use strict';

// JS-level-2
// homework-1
// task-1, task-2

(function (d) {
    d.onreadystatechange = () => {
        if (d.readyState === "complete") {
            const mainContent = d.querySelector('#main-content');

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
                    const nodeContent = document.createTextNode(this.content);
                    node.setAttribute('id', this.id);
                    node.setAttribute('class', this.className);
                    node.appendChild(nodeContent);

                    if (mainContent){
                        mainContent.appendChild(node);
                        console.log(`${this.id} is added`);
                    }
                }
            };

            // task-1
            // Улучшить базовый класс, добавив в него общий для всех метод remove(),
            // который удаляет контейнер.
            Container.prototype.remove = function() {
                const node = d.querySelector(`#${this.id}`);

                if (node)
                    node.remove();
                    console.log(`${this.id} was removed`);
            };

            const box = new Container('box', 'box', 'I am a box', 'div');
            const xbox = new Container('xbox', 'xbox', 'I am an xbox', 'div');

            box.render();
            xbox.render();
            box.remove();
        }
    }
})(document);
