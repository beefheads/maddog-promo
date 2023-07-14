import {debounce} from "../b_helpers/condition-helpers.js"

window.addEventListener('DOMContentLoaded', (event) => {
	const ageCheck = document.querySelector('.age-check');
	if (!ageCheck) return;


	ageCheck.parallaxModifier = 1 / 4;
	const updateCursor = ({ x, y }) => {
		if (window.innerWidth < window.screenWidth.laptop) return

		x *= ageCheck.parallaxModifier;
		y *= ageCheck.parallaxModifier;
	  ageCheck.style.setProperty('--x', `${x}px`);
	  ageCheck.style.setProperty('--y', `${y}px`);
	}
	const debouncedUpdateCurosr = debounce(updateCursor, 16);
	ageCheck.addEventListener('pointermove', debouncedUpdateCurosr);

	const accept = ageCheck.querySelector('.age-check__button-accept');
	accept.addEventListener('click', onAccept);

	const reject = ageCheck.querySelector('.age-check__button-reject');
	reject.addEventListener("click", onReject);

	function onAccept(e) {
		const snacky = ageCheck.querySelector('.snacky');
		console.log(snacky)
		if (snacky) snacky.removeSnack();

		hideAgeCheck();
		setAgeCheckCookie();
	}
	function onReject(e) {
		if (ageCheck.querySelector('.snacky')) return;

		new window.snacky('К сожалению, доступ к сайту разрешен только пользователям старше 18 лет.', ageCheck, 500000);
	}

	function hideAgeCheck() {
		ageCheck.classList.add('age-check--hidden');
		setTimeout(() => {
			accept.removeEventListener('click', onAccept);
			reject.removeEventListener('click', onReject);
			ageCheck.removeEventListener('pointermove', debouncedUpdateCurosr);
		}, 300)
		setTimeout(() => {
			ageCheck.remove();
		}, 1000)
	}

	function setAgeCheckCookie() {

	}

	/**
	 * notificationOfCookie() - отображение уведомления об использовании cookie
	 * Этот скрипт проверяет наличие куки accept_cookie и чтобы его значение было равно true.
	 * Если это не так, то он создает новый элемент, с содержимым HTML, которое должно быть указано вместо <YOUR-HTML-CODE>. После чего, спустя время равное showTime присваивает ему класс show. При клике по крестику, уведомление будет закрываться и удаляться из DOM через время равное removeTime. В данном случае, removeTime равно времени продолжения анимации скрытия уведомления (transition).
	 */
/*
	import Cookies from 'js-cookie';
	window.b_cookies = Cookies;
	function notificationOfCookie(showTime, removeTime) {
	    const acceptCookie = Cookies.get('accept_cookie');

	    if (acceptCookie != undefined || acceptCookie == false) { return }

	    setTimeout(() => {
	        cookie.classList.add('_show')
	    }, showTime)

	    const cookie = document.querySelector('.cookie');
	    const acceptCookieElem = cookie.querySelector('.cookie-accept')
	    acceptCookieElem.addEventListener('click', () => {
	        cookie.classList.remove('_show')
	        Cookies.set('accept_cookie', "true")

	        setTimeout(() => {
	          cookie.remove()
	        }, removeTime)
	    })


	}
	notificationOfCookie(300, 300);
	*/

});