const PERSONAL_CORS_PROXY_URL = 'https://cors-anywere-weather-proxy.herokuapp.com/';
const API_URL = 'https://www.metaweather.com';
const BASE_URL = `${PERSONAL_CORS_PROXY_URL}${API_URL}`;

export default class WeatherService {
	static async getLocationByCoords(lat, lon) {
		const response = await fetch(`${BASE_URL}/api/location/search/?lattlong=${lat},${lon}`);
		return await response.json();
	}

	static async getWeatherByCityId(id) {
		const response = await fetch(`${BASE_URL}/api/location/${id}`);
		return await response.json();
	}

}