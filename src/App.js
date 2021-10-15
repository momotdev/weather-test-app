import {useEffect, useState} from "react";
import './styles/App.css';
import WeatherService from "./API/WeatherService";
import {getColorByTemperature} from "./components/utils/temperature";
import LocalWeather from "./components/LocalWeather/LocalWeather";
import Loader from "./components/UI/Loader/Loader";
import SearchPanel from "./components/UI/SearchPanel/SearchPanel";
import CitiesList from "./components/CitiesList/CitiesList";

function App() {
	const [geolocation, setGeolocation] = useState(null);
	const [isAllowedGeolocation, setIsAllowedGeolocation] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchedCities, setSearchedCities] = useState(null);
	const [locationData, setLocationData] = useState({
		city: '',
		temperature: null,
		iconState: '',
	})

	useEffect(() => {
		requestGeolocation();
	}, []);

	useEffect(() => {
		if (geolocation) {
			fetchLocalWeather(geolocation)
				.then(({consolidated_weather: weather, title}) => {
					const latestWeather = weather[weather.length - 1];
					setLocationData((state) => {
						return {
							...state,
							city: title,
							temperature: latestWeather['the_temp'],
							iconState: latestWeather['weather_state_abbr']
						}
					});
				});
		}
	}, [geolocation])

	useEffect(() => {
		if (searchQuery) {
			fetchCitiesBySearchQuery(searchQuery)
				.then(response => {
					setSearchedCities(response);
				});
		}
	}, [searchQuery])

	const requestGeolocation = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				setGeolocation(position);
				setIsAllowedGeolocation(true);
			},
			() => setIsAllowedGeolocation(false));
	}

	const fetchLocalWeather = async (location) => {
		return await WeatherService.getLocationByCoords(location.coords.latitude, location.coords.longitude)
			.then(async (response) => {
				return await WeatherService.getWeatherByCityId(response[0].woeid);
			})
	}

	const fetchCitiesBySearchQuery = async (query) => {
		return await WeatherService.getCitiesBySearchQuery(query);
	}

	return (
		<div className="app" style={{background: getColorByTemperature(locationData.temperature)}}>
			{isAllowedGeolocation
				? <>
					{locationData.city
						? <LocalWeather city={locationData}/>
						: <Loader/>
					}
				</>
				: <h2>You have prohibited the use of your geolocation, please allow it to be used for the correct
					operation of the application.</h2>
			}
			<SearchPanel updateSearch={setSearchQuery}/>
			<CitiesList cities={searchedCities}/>
		</div>
	);
}

export default App;
