import React, {useEffect, useState} from 'react';
import classes from './CitiesList.module.css';
import WeatherService from "../../API/WeatherService";
import Loader from "../UI/Loader/Loader";
import CityListItem from "../CityListItem/CityListItem";

const CitiesList = ({cities}) => {
	const [citiesWeather, setCitiesWeather] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchWeatherByEachCity = (cities) => {
		const cityIds = cities.map(city => city.woeid);
		const promises = cityIds.map(city => WeatherService.getWeatherByCityId(city));
		return Promise.all(promises);
	}

	useEffect(() => {
		if (cities != null) {
			setIsLoading(true);
			fetchWeatherByEachCity(cities)
				.then(response => {
					setCitiesWeather(response);
					setIsLoading(false);
				}, reason => console.error(reason));
		}
	}, [cities])

	return (
		<div className={classes.list}>
			{cities?.length ? null : cities != null ? <div className={classes['not-found']}>No cities found!</div> : null}
			{isLoading
				? <Loader/>
				: <>
					{citiesWeather.map((city) => <CityListItem key={city['latt_long']} city={city}/>)}
				</>
			}
		</div>
	);
};

export default CitiesList;