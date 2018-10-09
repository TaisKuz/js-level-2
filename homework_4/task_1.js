'use strict';

// JS-level-2
// homework-4
// task-1, 2, 3

// ДЗ:
// 1.
// С помощью jQuery создать контрол, работающий с вкладками.
// Пример - http://dimox.name/examples/universal-jquery-tabs-script/ .
// Можно использовать любую анимацию, методы show, hide и подобные.Код примера желательно не смотреть.

// API:
// города: http://89.108.65.123/cities

(function (d) {
	d.addEventListener("DOMContentLoaded", function (e) {

		$('ul.tabs li').click(function () {
			var tab_id = $(this).attr('data-tab');

			$('ul.tabs li').removeClass('current');
			$('.tab-content').removeClass('current');

			$(this).addClass('current');
			$("#" + tab_id).addClass('current');
		})
	});
})(document);
