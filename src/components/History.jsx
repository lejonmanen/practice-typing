import { Sheet, Stack, Table } from "@mui/joy"


// {id, phrase, time, errors, score}
const WordHistory = ({ history  }) => (
	history.length < 1
	? null
	: <Table className="history" aria-label="word history table" stripe="even" hoverRow>
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
)
function format(n) {
	return Math.round(n * 10) / 10
}
//  style={{ fontWeight: 'bold', color: 'red' }}

export default WordHistory
