var Cards = require('./app.js')
var assert = require('assert')

var deck = new Cards()

deck.getAllCards()

describe('Testing shuffle capability', function(){
	let index1 = 27
	let index2 = 7
	let originalCards = [deck.cards[index1], deck.cards[index2]]
	deck.shuffle()
	let newCards = [deck.cards[index1], deck.cards[index2]]

	it('should return true if cards have changed position after shuffling', function(){
		var differentCards = originalCards[0] != newCards[0] || originalCards[1] != newCards[1]
		assert.equal(differentCards, true)
	})
})

describe('Extracting just one suit', function(){

	let suit = 'hearts'

	deck.shuffle()
	deck.getSuit(suit)

	let matches = function(card){
		return card.suit == suit
	}
	
	let correctSuits = deck.cards.every(matches)
	let length = deck.cards.length

	it('should return true if we get 13 cards, all of the correct suit', function(){
		var conditions = correctSuits && length == 13
		assert.equal(conditions, true)
	})
})

describe('Stacking the deck correctly', function(){
	deck.getAllCards()
	deck.shuffle()

	deck.stackDeck()

	expectedTopCards = [{value: 'A', suit: 'diamonds'}, 
	{value: 'K', suit: 'diamonds'}, 
	{value: 'A', suit: 'clubs'}, 
	{value: 'K', suit: 'clubs'}, 
	{value: 'A', suit: 'hearts'}, 
	{value: 'K', suit: 'hearts'},
	{value: 'A', suit: 'spades'},
	{value: 'K', suit: 'spades'}]

	let actualTopCards = deck.cards.slice(0,8)

	it('should return true if correct top 8 cards are in the expected order', function(){
		assert.deepEqual(actualTopCards, expectedTopCards, true)
	})
})

describe('Testing sort by value', function(){
	deck.getAllCards()
	deck.shuffle()

	let value = 6

	let sortFunction = (a,b)=>{

		if(a.value == value && b.value != value)return 0
		if(a.value != value && b.value == value)return 1
		else return 0
	}

	deck.sort(sortFunction)

	let topCard = deck.cards[0]

	it('should return true if card is the value sorted for', function(){
		assert.equal(topCard.value, value, true)
	})
})


