import { Chip, Sheet } from "@mui/joy"
import './Typer.css'
import { useEffect, useRef, useState } from "react"
import { isMetaCharacter, assess } from "./gameUtils"



const Typer = ({ phrase, whenDone }) => {
	const [typed, setTyped] = useState([])
	const [errorCount, setErrorCount] = useState(0)
	const sheetRef = useRef(null)

	useEffect(() => {
		sheetRef.current.focus()
		console.log('focused')
	}, [])

	const handleKeyDown = e => {
		// if( isFinished ) return
		if( isMetaCharacter(e.key) ) return
		if( e.key === 'Backspace' ) {
			setTyped(typed.slice(0, typed.length - 1))
		} else {
			const i = typed.length
			const s = status(phrase[i], e.key)
			if( s === 'error' ) setErrorCount(e => e + 1)
			setTyped([ ...typed, e.key])
		}

		if( phrase.join() === typed.join() + e.key ) {
			// setIsFinished(true)
			whenDone(errorCount)
		}
	}

	return (
		<Sheet className="typer" ref={sheetRef} tabIndex="0"
			onKeyDown={handleKeyDown}>
			{typed.map((t, index) => (
				<Chip key={index}
					style={{ fontFamily: 'Consolas', fontSize: '150%' }}
					className={'letter ' + status(phrase[index], t, setErrorCount)}
				>{t}</Chip>
			))}
		</Sheet>
	)
}


export default Typer
