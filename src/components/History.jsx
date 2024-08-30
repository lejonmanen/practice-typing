import { Sheet, Stack, Table, Typography } from "@mui/joy"


// {id, phrase, time, errors, score}
const WordHistory = ({ history  }) => {
	const [total, average, totalTime] = calc(history)
	return (
	history.length < 1
	? null
	: (<Stack>
	<Table className="history" aria-label="word history table" stripe="even" hoverRow>
		<thead>
			<tr>
				<th> Phrase </th>
				<th> Time (s) </th>
				<th> Errors </th>
				<th title="Word length divided by time. Errors give 1 second penalty."> Score </th>
			</tr>
			{history?.map(h => (
				<tr key={h.id}>
					<td>{h.phrase}</td>
					<td>{h.time}</td>
					<td>{h.errors}</td>
					<td> {format(h.score)} </td>
				</tr>
			))}
		</thead>
	</Table>
	<Typography> Total time: {totalTime} seconds </Typography>
	<Typography> Total score: {total} points </Typography>
	<Typography> Average score: {average} points </Typography>
	</Stack>)
)
}
function format(n) {
	return Math.round(n * 10) / 10
}
//  style={{ fontWeight: 'bold', color: 'red' }}
function calc(data) {
	if( !data ) return [0, 0, 0]
	let total=0, average=0, totalTime=0
	data.forEach(h => {
		totalTime += +h.time
		total += +h.score
	})
	average = total / data.length
	return [format(total), format(average), format(totalTime)]
}

export default WordHistory
