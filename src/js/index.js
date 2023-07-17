"use strict";

// Важно подключить первым, чтобы все быстрее отработало
import "./b_helpers/_quickfix.js"

import "./mdg_sections/_age-check.js";

import "./mdg_components/_showcase-card.js";

// import "./b_components/header/header.js";
import "./b_components/controls/formich.js";


import "./b_components/spawners/snacky.js";
import "./b_components/spawners/b_modal.js";


import "./mdg_sections/_showcase.js";


window.addEventListener('DOMContentLoaded', (event) => {
	if (document.body.classList.contains('page-product')) {
		setTimeout(() => {
			document.querySelector('.product').classList.add('product--visible');
		}, 300)

		document.querySelector('.slide-drop').classList.add('slide-drop--enter')
		setTimeout(() => {
			document.querySelector('.slide-drop').classList.add('slide-drop--active')
		}, 1400)
		document.querySelector('.slide-drop:last-child').style.zIndex = 7;

		window.initProductTabs(document.querySelector('.product'))
	}

	if (document.body.classList.contains('page-cocktail')) {
		setTimeout(() => {
			document.querySelector('.cocktail').classList.add('cocktail--visible');
		}, 300)

		document.querySelector('.slide-drop').classList.add('slide-drop--enter')
		setTimeout(() => {
			document.querySelector('.slide-drop').classList.add('slide-drop--active')
		}, 1400)
		document.querySelector('.slide-drop:last-child').style.zIndex = 7;

		window.initCocktailTabs(document.querySelector('.cocktail'))
	}
});
