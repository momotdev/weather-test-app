import {useEffect, useState} from "react";
import './styles/App.css';
import WeatherService from "./API/WeatherService";
import {getColorByTemperature} from "./components/utils/temperature";
import LocalWeather from "./components/LocalWeather/LocalWeather";
import Loader from "./components/UI/Loader/Loader";

function App() {
	const [geolocation, setGeolocation] = useState(null);
	const [isAllowedGeolocation, setIsAllowedGeolocation] = useState(true);
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

	return (
		<div className="app" style={{background: getColorByTemperature(locationData.temperature)}}>
			{isAllowedGeolocation
				? <div>
					{locationData.city
						? <LocalWeather city={locationData}/>
						: <Loader/>
					}
				</div>
				: <h2>You have prohibited the use of your geolocation, please allow it to be used for the correct
					operation of the application.</h2>
			}
		</div>
	);
}

export default App;
