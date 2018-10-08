'use strict';

// JS-level-2
// homework-3
// task-1, task-2, task-3

(function (d) {
	/* task-1
	У вас есть большой текст, в котором для обозначения диалогов используются одинарные
	кавычки.
	Придумать шаблон, который меняет одинарные кавычки на двойные.
	*/
	const textWithSingleQuotes = `
		Minion: 'aren’t But I must explain to you how all this mistaken idea aren’t',\
		Gru: 'of denouncing arwwen’t pleasure and praising pain wasn't born and'\
		Minion: 'the actual aren’t teachings of the great explorer of the truth,'\
	`

	const regexpQuotes = new RegExp("\'|\’", "gim")
	const textWithDobleQuotes = textWithSingleQuotes.replace(regexpQuotes, '"')
	const testStr = regexpQuotes.test(textWithDobleQuotes)
	console.log(`в тексте остались одинарные кавычки: ${testStr}`);
	console.log(`текст с двойными кавычками: ${textWithDobleQuotes}`);

	/* task-2
		Улучшить шаблон таким образом, чтобы конструкции типа aren’t не меняли одинарную
		кавычку на двойную.
	*/
	const regexpQuotesV2 = new RegExp("\'|\’^([a-z]+\’|\'[a-z]+)", "gim")
	const textWithDobleQuotesV2 = textWithSingleQuotes.replace(regexpQuotesV2, '"')
	const testStrV2 = regexpQuotesV2.test(textWithDobleQuotesV2)
	console.log(`в тексте остались одинарные кавычки: ${testStrV2}`);
	console.log(`текст с двойными кавычками: ${textWithDobleQuotesV2}`);


	/* task-3
		Создать форму обратной связи с полями: Имя, Телефон, e - mail, текст, кнопка «Отправить».
		При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:
			a.Имя содержит только буквы;
			b.Телефон подчиняется шаблону + 7(000)000 - 0000;
			c.E - mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my - mail@mail.ru
			d.Текст произвольный;
			e.В случае не прохождения валидации одним из полей необходимо выделять это поле
			красной рамкой и сообщать пользователю об ошибке.
	*/
	d.addEventListener("DOMContentLoaded", function (e) {
		const name = d.querySelector('#js-name');
		const email = d.querySelector('#js-email');
		const phone = d.querySelector('#js-phone');
		const text = d.querySelector('#js-text');

		const submitButton = d.querySelector('#js-submit-button');
		const form = d.querySelector('#js-user-form');

		form.addEventListener('submit', e => {
			const nameValue = name.value
			const emailValue = email.value
			const phoneValue = phone.value
			const textValue = text.value

			if (nameValue === '' || emailValue === '' || phoneValue === '' || textValue === '') return

			// a. Имя содержит только буквы;
			const letters = [
				'a-z', // english
				'а-яё', // russian
			].join('');

			const nameRegexp = new RegExp("^[" + letters + "\\- ']*$", "i");
			nameRegexp.test(nameValue)
			if (!nameRegexp.test(nameValue)) {
				console.log('Имя может содержать только буквы')
			}
		});
	});
})(document);
