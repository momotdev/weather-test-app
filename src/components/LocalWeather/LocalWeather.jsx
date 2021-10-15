import React from 'react';
import WeatherIcon from "../UI/WeatherIcon/WeatherIcon";

const LocalWeather = ({city}) => {
	return (
		<>
			<WeatherIcon
				url={`https://www.metaweather.com/static/img/weather/${city.iconState}.svg`}
				width={70}
				height={70}/>
			<h2>{city.city}, {(+city.temperature).toFixed()}°С</h2>
		</>
	);
};

export default LocalWeather;