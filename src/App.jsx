import { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherHighlights from './components/WeatherHighlights';
import { getWeatherData } from './services/weatherService';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bgGradient, setBgGradient] = useState('var(--gradient-sky-day)');
  const [backendStatus, setBackendStatus] = useState({
    message: '',
    loading: false,
    error: null,
  });

  const handleTestBackend = async () => {
    setBackendStatus({ message: '', loading: true, error: null });
    try {
      const response = await fetch('https://frontendapp-c0ao.onrender.com/api/test');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBackendStatus({
        message: data.message || JSON.stringify(data),
        loading: false,
        error: null,
      });
    } catch (err) {
      setBackendStatus({
        message: '',
        loading: false,
        error: err.message || 'Failed to fetch from backend',
      });
    }
  };

  const loadWeather = useCallback((city = 'New York') => {
    setIsLoading(true);
    // Simulate network delay for a realistic feel
    setTimeout(() => {
      const data = getWeatherData(city);
      setWeatherData(data);
      setBgGradient(data.current.condition.gradient);
      setIsLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  function handleCitySelect(city) {
    loadWeather(city);
  }

  function handleRefresh() {
    if (weatherData) {
      loadWeather(weatherData.city);
    }
  }

  return (
    <div className="app" style={{ '--bg-gradient': bgGradient }}>
      {/* Animated background */}
      <div className="app__bg">
        <div className="app__bg-gradient" />
        <div className="app__bg-orb app__bg-orb--1" />
        <div className="app__bg-orb app__bg-orb--2" />
        <div className="app__bg-orb app__bg-orb--3" />
      </div>

      <div className="app__container">
        {/* Header */}
        <header className="app__header animate-fade-in">
          <div className="app__brand">
            <div className="app__logo">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#logo-gradient)" strokeWidth="2" />
                <circle cx="16" cy="16" r="6" fill="url(#logo-gradient)" />
                <line x1="16" y1="4" x2="16" y2="8" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="24" x2="16" y2="28" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" />
                <line x1="4" y1="16" x2="8" y2="16" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" />
                <line x1="24" y1="16" x2="28" y2="16" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="app__name">SkyCast</span>
          </div>

          <SearchBar onCitySelect={handleCitySelect} currentCity={weatherData?.city} />

          <button
            className="app__refresh-btn"
            onClick={handleRefresh}
            disabled={isLoading}
            aria-label="Refresh weather data"
            id="refresh-weather-btn"
          >
            <svg
              className={`app__refresh-icon ${isLoading ? 'app__refresh-icon--spinning' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
        </header>

        {/* Temporary Backend Test */}
        <div className="app__backend-test animate-fade-in">
          <button
            className="app__backend-test-btn"
            onClick={handleTestBackend}
            disabled={backendStatus.loading}
            id="test-backend-btn"
          >
            {backendStatus.loading ? (
              <>
                <span className="app__backend-spinner" />
                Connecting...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="app__backend-icon">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
                Test Backend
              </>
            )}
          </button>

          {backendStatus.message && (
            <div className="app__backend-result app__backend-result--success" id="backend-result">
              <span className="app__backend-status-dot app__backend-status-dot--success" />
              <span>{backendStatus.message}</span>
            </div>
          )}

          {backendStatus.error && (
            <div className="app__backend-result app__backend-result--error" id="backend-error">
              <span className="app__backend-status-dot app__backend-status-dot--error" />
              <span>{backendStatus.error}</span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="app__loading">
            <div className="app__loading-spinner" />
            <span className="app__loading-text">Fetching weather data...</span>
          </div>
        )}

        {/* Main Content */}
        {!isLoading && weatherData && (
          <main className="app__main" id="weather-main-content">
            <div className="app__layout">
              {/* Left Column: Current Weather */}
              <div className="app__col-primary">
                <CurrentWeather data={weatherData} />
              </div>

              {/* Right Column: Forecasts & Highlights */}
              <div className="app__col-secondary">
                <HourlyForecast hours={weatherData.hourly} />
                <DailyForecast days={weatherData.daily} />
                <WeatherHighlights current={weatherData.current} />
              </div>
            </div>
          </main>
        )}

        {/* Footer */}
        <footer className="app__footer animate-fade-in delay-6">
          <p>SkyCast — Beautiful weather forecasts</p>
          <p className="app__footer-sub">Data is simulated for demonstration purposes</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
