import { Alert, Button, Chip, LinearProgress, Sheet, Stack, Typography } from "@mui/joy"
import { useState, useRef } from "react"
import { getPhrases, getPopular, shuffle } from "../data/phrases"
// import Timer from "./Timer.jsx"
import './Game.css'
import { assessKey, isMetaCharacter } from "./gameUtils.js"
import WordHistory from "./History.jsx"


function formatDiff(from, to) {
	let diff = String(Math.round((to - from) / 100) / 10)
	if( isNaN(diff) ) {
		console.log('formatDiff ', diff, to, from)
	}

	if( !diff.includes('.') ) {
		diff += '.0'
	}
	return diff
}
const Game = () => {
	const [phrases, setPhrases] = useState(getPhrases())
	const [pi, setPi] = useState(0)
	const [state, setState] = useState('initial')
	const [typed, setTyped] = useState([])
	const [errorCount, setErrorCount] = useState(0)
	const [history, setHistory] = useState([])
	const [message, setMessage] = useState('')
	const [wordTime, setWordTime] = useState(0)
	const [wordTimeStart, setWordTimeStart] = useState(0)
	const sheetRef = useRef(null)
	const timerRef = useRef(null)
	const stoptimerRef = useRef(false)

	const phrase = phrases[pi]

	const showMessage = msg => {
		setMessage(msg)
		setTimeout(() => setMessage(''), 1500)
	}
	const selectStart = () => {
		setState('playing')
		setTimeout(() => sheetRef.current.focus(), 200)
		doStart()
	}
	const doStart = () => {
		setWordTimeStart(Date.now())
		setWordTime(Date.now())
		timerRef.current = setInterval(() => {
			// if( !timerRef.current ) { return }  // time to stop
			if( !phrases ) {  // component unmounted
				clearInterval(timerRef.current)
				stoptimerRef.current = false
				return
			}
			let now = Date.now()
			// let diff = formatDiff(start, now)
			setWordTime(now)
		})
	}

	const whenDone = errorCount => {
		clearInterval(timerRef.current)
		timerRef.current = null
		console.log('Game: finished the word with ' + errorCount + ' errors.')
		let diff = formatDiff(wordTimeStart, wordTime)
		showMessage(`You finished the word in ${diff} seconds, with ${errorCount} errors.`)

		setPi(x => x + 1)
		setHistory([
			{ id: history.length, phrase: phrase, time: diff, errors: errorCount, score: phrase.length / ((wordTime - wordTimeStart)/1000 + errorCount) },
			...history
		])
		setTyped([])
		setErrorCount(0)
		if( pi + 1 >= phrases.length ) {
			showMessage('You did all the words! Well done!!')
			return
		}
		doStart()
	}

	const handleKeyDown = e => {
		let ec = errorCount
		if( isMetaCharacter(e.key) ) return
		if( e.key === 'Backspace' ) {
			setTyped(typed.slice(0, typed.length - 1))
		} else {
			const i = typed.length
			const s = assessKey(phrase[i], e.key)
			// console.log('Game.handleKeyDown, assessed: ' + s)
			if( s === 'wrong' ) {setErrorCount(e => e + 1); ec++}
			setTyped([ ...typed, e.key])
		}

		// console.log('Game: phrase=', `"${phrase}"==="${typed.join('') + e.key}", ec=`, errorCount)
		if( phrase === typed.join('') + e.key ) {
			whenDone(ec)
		}
	}
	return (
		<Sheet className="game">
			{state==='initial' && <Stack>
				<Typography> Are you ready? </Typography>
				<Button onClick={selectStart}> Start typing! </Button>

				<Stack direction="row">
					<Button variant="outlined" onClick={() => setPhrases(getPopular())}> Popular words </Button>
					<Button variant="outlined" onClick={() => setPhrases(getPhrases())}> Programming </Button>
				</Stack>
			</Stack>}

			<Stack style={state!=='playing' ? { display: 'none' } : null}>

				<LinearProgress determinate value={100 * pi / phrases.length} />

				<Typography> Type the phrase exactly as written, as fast as possible. </Typography>
				<code className="phrase" style={{ fontSize: '125%' }}>{phrase}</code>

				<Sheet className="typer" ref={sheetRef} tabIndex="0"
					onKeyDown={handleKeyDown}>
					{typed.map((t, index) => (
						<Chip key={index}
							style={{ fontFamily: 'Consolas', fontSize: '150%' }}
							className={'letter ' + assessKey(phrase[index], t)}
						>{t}</Chip>
					))}
				</Sheet>

				{state==='playing' && <p> {formatDiff(wordTimeStart, wordTime)} seconds. </p>}

				{/* <Stack direction="row">
				<Button variant="outlined"> Start over </Button>
				<Button variant="outlined"> Another </Button>
				</Stack> */}
			</Stack>

			{/* <p> The phrase is: {phrase} </p> */}

			{message && <Alert>{message}</Alert>}

			<WordHistory history={history} />
		</Sheet>
	)
}



export default Game
