'use strict';

// JS-level-2
// homework-1 from video
// task-1

/* ДЗ
	доработать кофеварку
	ввести значение зерен
	проверка на пустую кофеварку
	реализовать кнопку стоп
	* время приготовления зависит от кол-ва зерен
*/

function CoffeeMachine(power) {
	// удельная теплоемкость воды
	const waterHeatCapacity = 4200
	// время помола 1 грамма кофейных зерен (в сек)
	const grindingOneBeanTime = 2
	// температура воды до которой греем
	const maxTemp = 90
	// колличество воды в кофеварке
	let waterAmount = 0
	// колличество граммов зерен в кофеварке
	let beenAmount = 0
	// кофеварка запущена
	let isInProgress = false
	// setTimeout на преготовление кофе
	let progressTimeout
	// время приготовления
	let cookingTime

	this.fill = function (newWaterAmount, newBeenAmount) {

		// мне не нравится, что 3 раза повторяется почти идентичная конструкция из if
		// стоит ли выносить это в функцию ?
		if (!newWaterAmount || !newBeenAmount) {
			console.error('Кофеварка не заполнена')
			return
		}

		if (newWaterAmount < 50) {
			console.error('Слишком мало воды!')
			return
		}

		if (newBeenAmount < 50) {
			console.error('Слишком мало кофейных зерен!')
			return
		}
		waterAmount = newWaterAmount
		beenAmount = newBeenAmount
	}

	const getBoilTime = () => ((waterAmount * waterHeatCapacity * maxTemp) / power)
	const getGrindingTime = () => ((beenAmount * grindingOneBeanTime) / power)

	this.launch = () => {
		cookingTime = getGrindingTime() + getBoilTime()
		console.info(`Время ожидания: ${Math.round(cookingTime / 1000)} сек`)
		isInProgress = true

		progressTimeout = setTimeout(function () {
			console.log('Ваш кофе готов!')
			isInProgress = false
		}, cookingTime)
	}

	this.stop = (stopWord, stopTime) => {
		if (stopTime > cookingTime) {
			console.error('Меня не остановить')
			return
		}

		if (!isInProgress) {
			console.error('Кофеварка не была включена')
			return
		}

		setTimeout(function () {
			clearTimeout(progressTimeout)
			console.log(stopWord)
		}, stopTime)
	}
}

let vitek = new CoffeeMachine(6000)
vitek.fill(50, 100)
vitek.launch()
vitek.stop('горшочек не вари', 2000)
