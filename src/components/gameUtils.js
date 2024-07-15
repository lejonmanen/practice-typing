function isMetaCharacter(c) {
	return ['Shift', 'Control', 'Meta', 'Alt', 'AltGraph', 'Enter', 'Tab'].includes(c)
}
function assessKey(facit, key) {
	if( facit === undefined || key === undefined ) {
		return 'wrong'
	}
	if( key === facit ) return 'correct'
	else if( key.toLowerCase() === facit.toLowerCase() ) return 'warning'

	return 'wrong'
}

export { isMetaCharacter, assessKey }
