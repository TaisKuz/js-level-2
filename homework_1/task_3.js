'use strict';

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
		this._toppings = [];

		//  Размеры, виды начинок и добавок
		this.sizesPriceList = {
			'SIZE_SMALL': { priсe: 50, calories: 20 },
			'SIZE_LARGE': { priсe: 100, calories: 20 },
		};

		this.stuffingsPriceList = {
			'STUFFING_CHEESE': { type: "stuff", priсe: 10, calories: 20 },
			'STUFFING_SALAD': { type: "stuff", priсe: 20, calories: 5 },
			'STUFFING_POTATO': { type: "stuff", priсe: 15, calories: 10 },
		};

		this.topingsPriceList = {
			'TOPPING_SPICE': { type: "topping", priсe: 15, calories: 0 },
			'TOPPING_MAYO': { type: "topping", priсe: 20, calories: 5 },
		};
	}

	// Добавить добавку к гамбургеру. Можно добавить несколько
	// добавок, при условии, что они разные.
	set toppings(toppings) {
		if (!toppings) return;
		if (toppings.length == 0) return;

		let toppingsList = [];

		toppings.forEach(newTopping => {
			if (this._toppings.length > 0) {
				this._toppings.forEach(oldTopping => {
					if (newTopping !== oldTopping) {
						toppingsList.push(newTopping);
					}
				});
			} else {
				toppingsList.push(newTopping);
			}
		});

		this._toppings = toppingsList;
	};

	removeToppings(toppings) {
		if (toppings.length == 0 || this._toppings.length == 0) return;

		let toppingsList = this._toppings;

		toppings.forEach(toppingToRemove => {
			if (this._toppings.length > 0) {
				this._toppings.forEach((oldTopping, index) => {
					if (toppingToRemove === oldTopping) {
						toppingsList.splice(index, 1);
					}
				});
			}
		});

	  this._toppings = toppingsList;
	};

	calculatePrice() {
		if (!this.size || !this.stuffing) return;
		const size = this.sizesPriceList[this.size];

		if (!size) return;

		let prise = size.priсe;
		this.stuffing.forEach(stuffingItem => {
			prise += this.stuffingsPriceList[stuffingItem].priсe;
		});

		if (this._toppings.length > 0) {
			this._toppings.forEach(topping => {
				prise += this.topingsPriceList[topping].priсe;
			});
		}
		console.log('Your Hamburger Price is: ', prise)

		return prise
	};

	calculateCalories() {
		if (!this.size || !this.stuffing) return;
		const size = this.sizesPriceList[this.size];

		if (!size) return;

		let calories = size.calories;
		this.stuffing.forEach(stuffingItem => {
			calories += this.stuffingsPriceList[stuffingItem].calories;
		});

		if (this._toppings.length > 0) {
			this._toppings.forEach(topping => {
				calories += this.topingsPriceList[topping].calories;
			});
		}
		console.log('Your Hamburger calories: ', calories)

		return calories
	}
};

//  Размеры, виды начинок и добавок
// SIZE_SMALL = { type: "size", priсe: 50, calories: 20 };
// SIZE_LARGE = { type: "size", priсe: 100, calories: 20 };
// STUFFING_CHEESE = { type: "stuff", priсe: 10, calories: 20 };
// STUFFING_SALAD = { type: "stuff", priсe: 20, calories: 5 };
// STUFFING_POTATO = { type: "stuff", priсe: 15, calories: 10 };
// TOPPING_SPICE = { type: "topping", priсe: 15, calories: 0 };
// TOPPING_MAYO = { type: "topping", priсe: 20, calories: 5 };

const MyHamburger = new Hamburger('SIZE_SMALL', ['STUFFING_CHEESE', 'STUFFING_POTATO']);
MyHamburger.toppings = ['TOPPING_SPICE', 'TOPPING_MAYO'];
MyHamburger.removeToppings(['TOPPING_SPICE']);

MyHamburger.calculatePrice();
MyHamburger.calculateCalories();

console.log('MyHamburger ', MyHamburger);
