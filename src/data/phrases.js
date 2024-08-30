import { words } from "popular-english-words"

const wordAmount = 4

const basic = [
	'let x = 1',
	"console.log('Hello world!')",
	'const handler = () => {}'
]
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

function rand(x, y) {
	return Math.floor(Math.random() * (y - x + 1) + 1)
}
function pickRandom(array) {
	return array[ Math.floor(Math.random() * array.length) ]
}
function generateVars(n) {
	const vars = ['const', 'let']
	const modifier = [' = 1', ' == 1', ' === 1', ' = 0', '++', ' += 1', ' /= 2', ' *= 2']
	const names = ['count', 'value', 'button', 'manager', 'factory', 'data', 'cat', 'dog', 'parakeet', 'price', 'id', 'name', 'user']
	const verbs = ['set', 'get', 'print', 'show', 'toggle', 'handle', 'manage', 'delete']

	const result = []
	result.push(basic[rand(0, basic.length-1)])
	for(let i=1; i<n; i++ ) {
		let s = ''
		let r = rand(1, 3)

		if( r === 1 ) {  // let x = 5
			s = pickRandom(vars) + ' '
			s += pickRandom(names) + ' = '
			s += rand(0, 100)

		} else if( r === 2 ) {  // x[i] = 1
			let a = pickRandom(alphabet)
			if( Math.random() > 0.5 ) a += rand(1, 3)
			let v = pickRandom(names)
			let m = pickRandom(modifier)
			s = `${v}[${a}]${m}`

		} else if( r === 3 ) {  // setUser(x)
			s = pickRandom(verbs)
			s += `(${pickRandom(names)})`
		}
		result.push(s)
	}
	return result
}

function getPhrases() {
	// return shuffle([ ...basic ]).concat(generateVars(3))
	return shuffle(generateVars(wordAmount))
}
function getPopular() {
	// console.log(words.getMostPopular(25))
	let ws = words.getMostPopular(200).filter(w => w.length > 4)
	return shuffle( ws ).slice(0, wordAmount)  // 8 words
}

function shuffle(array) {
	// https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
		// [array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

export { getPhrases, shuffle, getPopular }
