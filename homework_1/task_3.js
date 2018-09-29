'use strict';

// [WIP] this task is in progress

// JS-level-2
// homework-1
// task-3

// task-3 *
// * Некая сеть фаст фудов предлагает несколько видов гамбургеров:
//   ● маленький (50 рублей, 20 калорий);
//   ● большой (100 рублей, 40 калорий).

// Гамбургер может быть с одним из нескольких видов начинок(обязательно):
//   ● сыром(+ 10 рублей, + 20 калорий);
//   ● салатом(+ 20 рублей, + 5 калорий);
//   ● картофелем(+ 15 рублей, + 10 калорий)

// Дополнительно, гамбургер можно
//   ● посыпать приправой(+ 15 рублей, 0 калорий)
//   ● и полить майонезом(+ 20 рублей, + 5 калорий).

// Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
// Используйте ООП подход (подсказка:
// нужен класс Гамбургер, константы, методы для выбора опций и расчета нужных величин).

class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
  }

  // Добавить добавку к гамбургеру. Можно добавить несколько
  // добавок, при условии, что они разные.
  set toppings(toppings) {
    if (toppings.lenght == 0) return;

    let toppingsList = [];
    for (let topping in toppings) {
      for (let index in this.toppings) {
        if (toppings[topping] !== this.toppings[index]) {
          toppingsList.push(toppings[topping]);
        }
      }
    }
    [this.toppings] = toppingsList;
  };

  removeToppings(toppings) {
    if (toppings.lenght == 0 || this.toppings.lenght == 0) return;

    let toppingsList = this.toppings;
    for (let topping in toppings) {
      for (let index in this.toppings) {
        if (toppings[topping] === this.toppings[index]) {
          toppingsList.splice(index, index);
        }
      }
    }
    [this.toppings] = toppingsList;
  }
};

//  Размеры, виды начинок и добавок
const SIZE_SMALL = { type: "size", priсe: 50, calories: 20 };
const SIZE_LARGE = { type: "size", priсe: 100, calories: 20 };
const STUFFING_CHEESE = { type: "stuff", priсe: 10, calories: 20 };
const STUFFING_SALAD = { type: "stuff", priсe: 20, calories: 5 };
const STUFFING_POTATO = { type: "stuff", priсe: 15, calories: 10 };
const TOPPING_SPICE = { type: "topping", priсe: 15, calories: 0 };
const TOPPING_MAYO = { type: "topping", priсe: 20, calories: 5 };

const MyHamburger = new Hamburger(SIZE_SMALL, [STUFFING_CHEESE, STUFFING_POTATO]);
MyHamburger.toppings = [TOPPING_SPICE, TOPPING_MAYO];
MyHamburger.removeToppings([TOPPING_SPICE]);

console.log('MyHamburger ', MyHamburger);
