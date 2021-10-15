export const getColorByTemperature = (temperature) => {
	let color = '#ffffff';

	if (temperature) {
		if (temperature <= -10) {
			color = '#00ffff';
		} else if (temperature > -10 && temperature < 30) {
			color = '#fff700';
		} else if (temperature >= 30) {
			color = '#ff8c00';
		}
	} else {
		return color;
	}

	return color;
}