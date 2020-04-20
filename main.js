const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
	} else {
		secondCard = this;

		checkForMatch();
	}
}

function checkForMatch() {
	if (firstCard.dataset.z === secondCard.dataset.z) {
		firstCard.removeEventListener('click', flipCard);
		secondCard.removeEventListener('click', flipCard);

		resetBoard();
	} else {
		lockBoard = true;
		setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');

			resetBoard();
		}, 500);
	}
}

function resetBoard() {
	[ hasFlippedCard, lockBoard ] = [ false, false ];
	[ firstCard, secondCard ] = [ null, null ];
}

(function shuffle() {
	cards.forEach((card) => {
		let num = Math.floor(Math.random() * 12);
		card.style.order = num;
	});
})();

cards.forEach((card) => card.addEventListener('click', flipCard));
