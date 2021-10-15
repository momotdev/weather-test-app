import React from 'react';
import classes from './CityListItem.module.css';
import WeatherIcon from "../UI/WeatherIcon/WeatherIcon";

const CityListItem = ({city}) => {
	const latestCityWeather = city.consolidated_weather[city.consolidated_weather.length - 1];
	const {title: cityName, parent: {title: country}} = city;

	return (
		<div className={classes['list-item']}>
			<div className={classes['image-wrapper']}>
				<WeatherIcon
					url={`https://www.metaweather.com/static/img/weather/${latestCityWeather['weather_state_abbr']}.svg`}
					height={50} width={50}/>
			</div>
			<div className={classes['info-wrapper']}>
				<div><span className={classes.city}>{cityName}</span>, {country} [{latestCityWeather['weather_state_name']}]
				</div>
				<div className={classes.temperature}>{latestCityWeather['the_temp'].toFixed()} °C</div>
				<div className={classes.coords}>[{city['latt_long']}]</div>
			</div>
		</div>
	);
};

export default CityListItem;