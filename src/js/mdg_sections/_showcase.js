window.addEventListener('DOMContentLoaded', (event) => {
	const showcaseSections = document.querySelectorAll('.showcase');
	const SHOWCASE_CLASSES = {
		cardCurrent: 'showcase-card--opened',
		cardInited: 'showcase-card--inited',
		sectionHasOpened: 'showcase--has-opened',
	}
	const HEIGHT_MODIFIER = 0;

	showcaseSections.forEach(showcase => {
		initShowcase(showcase);
	})

	function initShowcase(showcase) {
		const cards = [...showcase.querySelectorAll('.showcase-card')];

		let cardsHeights = cards.map((currentCard) => {
			return currentCard.querySelector('.showcase-card__body').getBoundingClientRect().height;
		})
		let maxCardsHeight = Math.max(...cardsHeights);
		cards.forEach((currentCard, index) => {
			currentCard.querySelector('.showcase-card__body').style.height = `${maxCardsHeight + HEIGHT_MODIFIER}px`;
			if (currentCard.classList.contains(SHOWCASE_CLASSES.cardInited)) return;
			
			currentCard.dataset.key = 'showcase-card-' + index;
			currentCard.addEventListener('click', (e) => {
				if (!showcase.classList.contains(SHOWCASE_CLASSES.sectionHasOpened)) {
					showcase.classList.add(SHOWCASE_CLASSES.sectionHasOpened);
				}
				showcase.dataset.name = currentCard.dataset.name;

				currentCard.classList.add(SHOWCASE_CLASSES.cardCurrent);
				cards.forEach(card => {
					if (card.dataset.key == currentCard.dataset.key) return;
					card.classList.remove(SHOWCASE_CLASSES.cardCurrent);
				})
			});

			currentCard.classList.add(SHOWCASE_CLASSES.cardInited);
		});
	}
});