'use strict';

// JS-level-2
// homework-2
// task-1

// Доп. информация:
// https://learn.javascript.ru/promise
// https://learn.javascript.ru/fetch

// ДЗ:
// 1. Реализовать вывод списка пользователей(http://89.108.65.123/user)
// 2. Реализовать возможность просмотра информации по конкретному пользователю(http://89.108.65.123/user/1) при клике на пользователя в списке
// 3. Создать форму для создания пользователя

// API:
// BASE_URL: http://89.108.65.123
// список пользователей(GET): http://89.108.65.123/user/
// данные пользователя(GET): http://89.108.65.123/user/id
// id - число от 1 до длинны списка пользователей, id являеться порядковым номером в списке
// создать пользователя(POST): http://89.108.65.123/user/
// в тело запроса принимает JSON с полями name(строка), email(строка), age(число)
// в ответ отдает ID созданого пользователя

// ВАЖНО! Сервер один на всех и не имеет валидации на отправляемые данные! Поэтому стараемся не положить сервер, и отправлять корректные данные.

// Исходный код сервер(Node.js): https://github.com/inferal73/homework_json

(function (d) {
	d.addEventListener("DOMContentLoaded", function (e) {
		const name = d.querySelector('#js-name');
		const email = d.querySelector('#js-email');
		const age = d.querySelector('#js-age');

		const submitButton = d.querySelector('#js-submit-button');
		const showUsersButton = d.querySelector('#js-show-users-button');
		const form = d.querySelector('#js-user-form');
		 
		// 1. Реализовать вывод списка пользователей(http://89.108.65.123/user)
		showUsersButton.addEventListener('click', e => {
			const usersListWrapper = d.querySelector('#js-user-list-wrapper');
			let usersListContainer = d.createElement('ul');

			const USERS_LIST_ENDPOINT = 'http://89.108.65.123/user'

			fetch(USERS_LIST_ENDPOINT)
				.then(response => {

					return response.json();
				})
				.then(users => {
					console.log(users)
					users.forEach((user, index) => {
						console.log(user.id, 'user.id')
						const userName = user.name
						const userEmail = user.email
						const userAge = user.age

						if (user instanceof Object && userName && userEmail && userAge){
							let li = d.createElement('li');
							let userLink = d.createElement('a');
							let span = d.createElement('span');
							const nodeContent = document.createTextNode(userName);
							
							userLink.setAttribute('href', '#');
							userLink.setAttribute('id', index+1);
							userLink.appendChild(nodeContent);
							li.appendChild(userLink);

							span.classList.add('hidden');
							li.appendChild(span)

							usersListContainer.appendChild(li)
						}
					})

					usersListWrapper.appendChild(usersListContainer)

					// 2. Реализовать возможность просмотра информации
					//  по конкретному пользователю(http://89.108.65.123/user/1)/
					//  при клике на пользователя в списке

					usersListContainer.addEventListener('click', e => {
						e.preventDefault()
						let span = e.target.parentNode.querySelector('span');
						const userId = e.target.id;

						if (span.classList.contains('hidden')){
							span.classList.remove('hidden')
							const USER_DATA_ENDPOINT = `http://89.108.65.123/user/${userId}`

							fetch(USER_DATA_ENDPOINT)
							.then(response => {
								
								return response.json();
							})
							.then(userData => {
									const userDataText = `name: ${userData.name}, email: ${userData.email}, age: ${userData.age}`
									const userDataContent = document.createTextNode(userDataText);
									let strong = d.createElement('strong');
									strong.appendChild(userDataContent)
									span.appendChild(strong)
								})
								.catch(console.log.bind(console));			
						} 
						else {
							span.classList.add('hidden')
							span.querySelector('strong').remove()
						}
					})
				})
				.catch(console.log.bind(console));
		})

		// 3. Создать форму для создания пользователя
		form.addEventListener('submit', e => {
			const nameValue = name.value
			const emailValue = email.value
			const ageValue = age.value

			if (nameValue === '' || emailValue === '' || ageValue === '') return

			if (ageValue < 1 || ageValue > 150) {
				console.log('введите корректный возраст')
				return
			}

			const ADD_USER_ENDPOINT = 'http://89.108.65.123/user/'
			const addUseroptions = {
				method: 'POST',
				body: JSON.stringify({
					name: nameValue,
					email: emailValue,
					age: ageValue,
				}),
			}

			fetch(ADD_USER_ENDPOINT, addUseroptions)
				.then(response => {
					submitButton.disabled
					if (!response.ok) throw Error('user didn\'t added');

					return response.json();
				})
				.then(userId => {
					submitButton.disabled = false
					console.log('New user was added with id: ', userId) 
				})
				.catch(console.log.bind(console));
		}); 	
	});
})(document);
