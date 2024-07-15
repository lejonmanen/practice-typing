import { useState } from 'react'
import './App.css'
import { Button, Sheet, Stack, Typography } from '@mui/joy'
import Game from './components/Game'

function App() {
	const [count, setCount] = useState(0)

	//
  	return (
		<>
			<Sheet className="sheet" variant="outlined">
				<Typography level="h1" component="h1"
					sx={theme => ({ borderBottom: `2px solid ${theme.vars.palette.divider}` })}
				> Practice typing </Typography>

				<Game />

			</Sheet>
			{/* <Sheet
			sx={{
			width: 300,
			mx: 'auto', // margin left & right
			my: 4, // margin top & bottom
			py: 3, // padding top & bottom
			px: 2, // padding left & right
			display: 'flex',
			flexDirection: 'column',
			gap: 2,
			borderRadius: 'sm',
			boxShadow: 'md',
			}}
			variant="outlined"
			>
				sheety 2
			</Sheet> */}
		</>
	)
}

export default App
