import React from 'react';

const WeatherIcon = ({url, width, height}) => {
	return (
		<div>
			<img src={url} width={width} height={height} alt="Weather state icon"/>
		</div>
	);
};

export default WeatherIcon;