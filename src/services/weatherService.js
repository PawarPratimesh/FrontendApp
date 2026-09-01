// Simulated weather data service
// In production, you'd replace this with calls to OpenWeatherMap, WeatherAPI, etc.

const WEATHER_CONDITIONS = {
  sunny: {
    label: 'Sunny',
    icon: '☀️',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 40%, #60a5fa 100%)',
  },
  partly_cloudy: {
    label: 'Partly Cloudy',
    icon: '⛅',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #475569 50%, #94a3b8 100%)',
  },
  cloudy: {
    label: 'Cloudy',
    icon: '☁️',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #64748b 100%)',
  },
  rainy: {
    label: 'Rainy',
    icon: '🌧️',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #475569 100%)',
  },
  stormy: {
    label: 'Thunderstorm',
    icon: '⛈️',
    gradient: 'linear-gradient(135deg, #0c0a1a 0%, #1e1b4b 50%, #312e81 100%)',
  },
  snowy: {
    label: 'Snowy',
    icon: '🌨️',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #cbd5e1 100%)',
  },
  clear_night: {
    label: 'Clear Night',
    icon: '🌙',
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #1a1a40 50%, #24243e 100%)',
  },
};

const CITIES = {
  'New York': { lat: 40.71, lon: -74.01 },
  'London': { lat: 51.51, lon: -0.13 },
  'Tokyo': { lat: 35.68, lon: 139.69 },
  'Sydney': { lat: -33.87, lon: 151.21 },
  'Paris': { lat: 48.86, lon: 2.35 },
  'Dubai': { lat: 25.20, lon: 55.27 },
  'Mumbai': { lat: 19.08, lon: 72.88 },
  'San Francisco': { lat: 37.77, lon: -122.42 },
};

function getRandomCondition() {
  const keys = Object.keys(WEATHER_CONDITIONS);
  return keys[Math.floor(Math.random() * keys.length)];
}

function generateHourlyForecast() {
  const hours = [];
  const now = new Date();
  const baseTemp = 18 + Math.random() * 15;

  for (let i = 0; i < 24; i++) {
    const hour = new Date(now);
    hour.setHours(now.getHours() + i);
    const tempVariation = Math.sin((i / 24) * Math.PI * 2) * 5;
    const conditionKey = getRandomCondition();

    hours.push({
      time: hour,
      temp: Math.round(baseTemp + tempVariation + (Math.random() * 3 - 1.5)),
      condition: WEATHER_CONDITIONS[conditionKey],
      conditionKey,
      precipitation: Math.round(Math.random() * 100),
      windSpeed: Math.round(5 + Math.random() * 25),
    });
  }
  return hours;
}

function generateDailyForecast() {
  const days = [];
  const now = new Date();
  const baseTemp = 20 + Math.random() * 10;

  for (let i = 0; i < 7; i++) {
    const day = new Date(now);
    day.setDate(now.getDate() + i);
    const conditionKey = getRandomCondition();

    days.push({
      date: day,
      high: Math.round(baseTemp + Math.random() * 8),
      low: Math.round(baseTemp - 5 - Math.random() * 5),
      condition: WEATHER_CONDITIONS[conditionKey],
      conditionKey,
      precipitation: Math.round(Math.random() * 100),
      humidity: Math.round(40 + Math.random() * 50),
      windSpeed: Math.round(5 + Math.random() * 30),
    });
  }
  return days;
}

export function getWeatherData(cityName = 'New York') {
  const conditionKey = getRandomCondition();
  const condition = WEATHER_CONDITIONS[conditionKey];
  const temp = Math.round(18 + Math.random() * 18);

  return {
    city: cityName,
    coordinates: CITIES[cityName] || CITIES['New York'],
    current: {
      temp,
      feelsLike: temp + Math.round(Math.random() * 4 - 2),
      condition,
      conditionKey,
      humidity: Math.round(40 + Math.random() * 50),
      windSpeed: Math.round(5 + Math.random() * 25),
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      pressure: Math.round(1000 + Math.random() * 30),
      visibility: Math.round(5 + Math.random() * 15),
      uvIndex: Math.round(1 + Math.random() * 10),
      dewPoint: Math.round(10 + Math.random() * 15),
    },
    hourly: generateHourlyForecast(),
    daily: generateDailyForecast(),
    lastUpdated: new Date(),
  };
}

export function searchCities(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return Object.keys(CITIES).filter(city => city.toLowerCase().includes(q));
}

export { WEATHER_CONDITIONS, CITIES };
