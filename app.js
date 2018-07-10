
//in lieu of Math.random, simple rand num generator 
let genRand = function(seed){
	let randFourDigit = ((seed * seed)/100)%10000 + 1000
	return randFourDigit
}

//custom sorting function, basically bubble sort methodology

let sortDeck = function(array, func){
	let swapped;
	do {
    swapped = false;
    for(let i = 0; i < array.length; i++) {
      if(array[i] && array[i + 1] && func(array[i], array[i + 1]) == 1) {
        let temp = array[i];
  		array[i] = array[i+1];
  		array[i+1] = temp;
        swapped = true;

      }
    }
  } while(swapped)

  return array;
}

//Made cards class, could have also made each individual card an instance of a "card" class, but thought this was quicker
var Cards = class {
	constructor(){
		this.cards = []
		this.suits = ['spades', 'clubs', 'hearts', 'diamonds']
		this.cardVals = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
	}

	//assumes that when you get the cards, they are unshuffled
	getAllCards(){
		let unShuffledCards = []

		for(let i=0;i<this.cardVals.length;i++){
			let val = this.cardVals[i]
			this.suits.map((suit)=>{
				unShuffledCards.push({value: val, suit: suit})
			})
		}
		this.cards = unShuffledCards
		return;
	}

	//this is meant to mimic the way people actually shuffle cards - ie., dividing the deck into 2 even halves, 
	//and starting from bottom combining the 2 halves randomly (50/50 chance next card comes from either half)
	
	shuffle(){
		if(!this.cards)return;

		let left = this.cards.slice(0, 26)
		let right = this.cards.slice(26,52)

		let shuffledDeck = []
		let now = Date.now().toString()
		let seedNum = now.slice(-4)
		let nextCard;

		for(let i=0; i<52; i++){
			if(left.length == 0){
				nextCard = right.pop()
				shuffledDeck.unshift(nextCard)
				continue;
			}
			if(right.length == 0){
				nextCard = left.pop()
				shuffledDeck.unshift(nextCard)
				continue;
			}
			else {
				seedNum = genRand(seedNum)

				if(seedNum > 5500){
					nextCard = right.pop()
					shuffledDeck.unshift(nextCard)
				}
				else{
					nextCard = left.pop()
					shuffledDeck.unshift(nextCard)
				}
			}
		}

		this.cards = shuffledDeck
	}
	//this one is pretty simple, just filtering the array for all cards of the given suit
	getSuit(suit){
		this.cards = this.cards.filter(card=>card.suit == suit)
	}

	//uses custom sorting function above, lots of conditionals here
	stackDeck(){

		this.cards = sortDeck(this.cards, (card1, card2)=>{

			let suitOrder = ['spades', 'hearts', 'clubs', 'diamonds']

			//if neither card is a king or ace, go to the next
			if(card1.value != 'A' && card1.value != 'K' && card2.value != 'A' && card2.value != 'K')return 0

			//if the first card is a king or an ace, and the second is not, swap them
			if((card1.value == 'A' || card1.value == 'K') && (card2.value != 'A' && card2.value != 'K'))return -1
			if ((card1.value != 'A' && card1.value != 'K') && (card2.value == 'A' || card2.value == 'K')) return 1

			//if both cards are either a king or an ace, swap based on suit order
			if(suitOrder.indexOf(card1.suit) > suitOrder.indexOf(card2.suit))return -1
			if(suitOrder.indexOf(card1.suit) < suitOrder.indexOf(card2.suit))return 1

			//prioritize aces over kings of the same suit
			if(card1.value == 'A' && card2.value != 'A')return -1
			else return 1
		})
	}
	//sorts by whatever function is provided, example in tests.js
	sort(func){
		this.cards = sortDeck(this.cards, func);
	}
}

module.exports = Cards

