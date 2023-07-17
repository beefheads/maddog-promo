import {preloadImages} from '../b_helpers/action-helpers.js';

window.addEventListener('DOMContentLoaded', (event) => {
	const cards = [...document.querySelectorAll('.showcase-card')];

	if (cards.length < 1) return;

	preloadImages()

	const CARDS_CLASSES = {
		ajaxInited: 'showcase-card--ajax-inited',
	}

	const DROP_CLASSES = {
		enter: 'slide-drop--enter',
		active: 'slide-drop--active',
	}

	cards.forEach((card) => {
		initCard(card);
	});

	function handleCardClick(e) {
		const currentCard = e.target.closest('.showcase-card');
		growDrop(currentCard);
	}

	document.body.addEventListener('drop-growed', (e) => {
		document.body.classList.remove('page-home');
		hideProductList();
		document.body.dataset.theme = e.detail.theme;

		const zIndex = 5 + [...document.querySelectorAll('.slide-drop')].length;

		// хотел сделать, чтобы предыдущий продукт убирался
		spawnProduct(e.detail.theme, zIndex);
		spawnDrop(zIndex + 1);
	})

	function hideProductList() {
		if (!document.querySelector('main > .section.showcase')) return;
		document.querySelector('main > .section.showcase').classList.add('is-hidden');
	}

	function getLastDrop() {

	}

	function growDrop(currentCard) {
		const drop = document.querySelector('.slide-drop:last-child');

		drop.classList.add(DROP_CLASSES.enter);

		setTimeout(() => {
			drop.classList.add(DROP_CLASSES.active);
		}, 1500);

		const dropGrowed = new CustomEvent("drop-growed", {
		  detail: {
		  	theme: currentCard.dataset.theme,
		  },
		});
		setTimeout(() => {
			document.body.dispatchEvent(dropGrowed);
		}, 800)
	}

	function spawnDrop(zIndex) {
		const drop = `
			<div class="slide-drop" style="z-index: ${zIndex};">
				<div class="slide-drop__inner">
					<div class="slide-drop__content"></div>
					<div class="slide-drop__paper"></div>
					<div class="slide-drop__glow"></div>
					<div class="slide-drop__blink"></div>
				</div>
			</div>
		`;
		const dropContainer = document.querySelector('.slide-drop-container');

		dropContainer.innerHTML += drop;
	}

	function initCard(card) {
		if (card.classList.contains(CARDS_CLASSES.ajaxInited)) return;

		card.addEventListener('click', handleCardClick);

		const button = card.querySelector('.showcase-card__button')
		button.addEventListener('click', (e) => {
			e.preventDefault();
		});

		card.classList.add(CARDS_CLASSES.ajaxInited);
	}

	function spawnProduct(productName, zIndex = 5) {
		if (typeof window.products[productName] == 'undefined') {
			console.warn(`No such product "${productName}"`);
			return;
		}
		const {title, desc, related} = window.products[productName];

		let productSection = `
			<section class="section product">
			  <div class="container product__container">
			    <div class="product__hero">
			      <p class="product__hero-name">
			        <span class="product__hero-name-text">${title}</span>
			      </p>
			      <div class="product__media">
			        <picture class="product__media-pic">
			          <source srcset="./img/${productName}/product.webp" type="image/webp">
			          <img src="./img/${productName}/product.png" alt="MAD DOG VODKA ${title}" class="product__media-img">
			        </picture>
			        <div class="product__media-decor-1" style="background-image: url('./img/${productName}/${productName}.png');"></div>
		`;

					    if (typeof hide_ice == 'undefined') {
					    	productSection += `<div class="product__media-decor-2" style="background-image: url('./img/${productName}/ice-1.png');"></div>`
					    }

					    if (typeof hide_ice == 'undefined') {
					    	productSection += `<div class="product__media-decor-3" style="background-image: url('./img/${productName}/ice-2.png');"></div>`;
					    }

    productSection +=
    `
			      </div>
			    </div>
			    <div class="product__details">
			      <div class="product__details-tabs">
			        <button class="button-paper product__details-tabs-button product__details-tabs-button--active" type="button">
			          <span class="button__text">ПРОДУКТЫ</span>
			          <span class="button__bg"></span>
			        </button>
			        <a href="@@cocktail.html" class="button-paper product__details-tabs-button">
			          <span class="button__text">КОКТЕЙЛИ</span>
			          <span class="button__bg"></span>
			        </a>
			      </div>
			      <h1 class="product__title">
			        <span class="section-text--bold">MAD DOG VODKA</span><br>
			        <span class="product__title-model">${title}</span>
			      </h1>
			      <p class="product__desc">${desc}</p>
			      <ul class="product__stats-list">
			        <li class="product__stat">
			          <span class="product__stat-title">Объем:</span>
			          <span class="product__stat-value">0,5 л</span>
			        </li>
			        <li class="product__stat">
			          <span class="product__stat-title">Крепость:</span>
			          <span class="product__stat-value">38 %</span>
			        </li>
			      </ul>

			      <section class="showcase product__related">
			          <div class="runway showcase__runway">
			            <div class="runway__shaft">
			              <div class="runway__lift">
		`;

											if (typeof related == 'object') {
												related.forEach(relatedName => {
													productSection += getProductCard(relatedName);
												});
											}

		productSection += `
			              </div>
			            </div>
			          </div>
			      </section>
			      <div class="product__details-decor" style="background-image: url('./img/${productName}/ice-last.png');">
			      </div>
			    </div>
			  </div>
			</section>
		`;

		const ajaxProduct = document.createElement('div');
		ajaxProduct.classList.add('js_product', 'js_product--inited');
		ajaxProduct.innerHTML = productSection;
		ajaxProduct.style.zIndex = zIndex;
		document.querySelector('main').append(ajaxProduct);

		const miniCards = ajaxProduct.querySelectorAll('.showcase-card');
		miniCards.forEach(card => {
			initCard(card);
		})

	}

	function getProductCard(productName) {
		const {className, title} = window.products[productName];

		let productCard = `
			<article class="showcase-card showcase-card--${productName} ${className}" data-theme="${productName}">
			  <div class="showcase-card__body">
			    <h3 class="showcase-card__model">
			      <div class="showcase-card__model-name">${title}</div>
			    </h3>
			    <div class="showcase-card__media">
			      <picture class="showcase-card__media-pic">
			        <source srcset="./img/${productName}/carousel-hero.webp" type="image/webp">
			        <img src="./img/${productName}/carousel-hero.jpg" alt="MAD DOG VODKA ${title}" class="showcase-card__media-img">
			      </picture>
			    </div>
			      <div class="showcase-card__info">
			        <div class="showcase-card__buttons">
			          <a href="${productName}.html" class="showcase-card__button button-paper">
			            <span class="button__text">УЗНАТЬ БОЛЬШЕ</span>
			            <span class="button__bg"></span>
			          </a>
			        </div>
			      </div>
			  </div>
			</article>
		`;

		return productCard;
	}

	function spawnCocktail() {
		const cocktail = `
			<section class="section cocktail cocktail--@@theme">
			  <div class="container cocktail__container">
			    <div class="cocktail__hero">
			      <p class="cocktail__hero-name">
			        <span class="cocktail__hero-name-text">@@model</span>
			      </p>
			      <div class="cocktail__media">
			        <picture class="cocktail__media-pic">
			          <source srcset="./img/cocktails/@@img.webp" type="image/webp">
			          <img src="./img/cocktails/@@img.jpg" alt="MAD DOG VODKA @@model" class="cocktail__media-img">
			        </picture>
			        <div class="cocktail__media-decor-1" style="background-image: url('./img/@@theme/@@theme.png');"></div>
			        @@if (typeof hide_ice == 'undefined') {
				        <div class="cocktail__media-decor-2" style="background-image: url('./img/@@theme/ice-1.png');"></div>
			        }
			        @@if (typeof hide_ice == 'undefined') {
				        <div class="cocktail__media-decor-3" style="background-image: url('./img/@@theme/ice-2.png');"></div>
			        }
			      </div>
			    </div>
			    <div class="cocktail__details">
			      <div class="cocktail__details-tabs">
			        <a href="@@theme.html" class="button-paper cocktail__details-tabs-button">
			          <span class="button__text">ПРОДУКТЫ</span>
			          <span class="button__bg"></span>
			        </a>
			        <button class="button-paper cocktail__details-tabs-button  cocktail__details-tabs-button--active" type="button">
			          <span class="button__text">КОКТЕЙЛИ</span>
			          <span class="button__bg"></span>
			        </button>
			      </div>
			      <h1 class="cocktail__title">
			        <span class="section-text--bold">КОКТЕЙЛЬ</span><br>
			        <span class="cocktail__title-model">@@model</span>
			      </h1>
			      <div class="cocktail__desc">
			        <div class="cocktail__ingridients">
			          <h3 class="cocktail__ingridients-title">
			            Необходимые ингредиенты:
			          </h3>
			          <ul class="cocktail__ingridients-list">
			            @@for (var i = 0; i < ingridients.length; i++) {
			              <li class="cocktail__ingridients-item">
			                <span class="section-text--bold">
			                  volume[i]
			                </span>
			                ingridients[i]
			              </li>
			            }
			          </ul>
			        </div>
			        <div class="cocktail__steps">
			          <h3 class="cocktail__steps-title">Приготовление:</h3>
			          <ol class="cocktail__steps-list">
			            @@for (var i = 0; i < steps.length; i++) {
			              <li class="cocktail__steps-item">steps[i]</li>
			            }
			          </ol>
			        </div>
			      </div>

			      <section class="showcase product__related cocktail__related">
			          <div class="runway showcase__runway">
			            <div class="runway__shaft">
			              <div class="runway__lift">
			              </div>
			            </div>
			          </div>
			      </section>

			      <div class="cocktail__details-decor" style="background-image: url('./img/@@theme/ice-last.png');">
			      </div>
			    </div>
			    
			  </div>
			</section>
		`

		document.querySelector('main').innerHTML += productSection;
	}

});