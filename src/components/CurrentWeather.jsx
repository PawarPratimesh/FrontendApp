import './CurrentWeather.css';

export default function CurrentWeather({ data }) {
  if (!data) return null;

  const { current, city, lastUpdated } = data;

  return (
    <section className="current-weather animate-fade-in-up" id="current-weather-section">
      <div className="current-weather__location">
        <svg className="current-weather__pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <h1 className="current-weather__city">{city}</h1>
      </div>

      <div className="current-weather__main">
        <div className="current-weather__icon-wrap animate-float">
          <span className="current-weather__icon">{current.condition.icon}</span>
        </div>
        <div className="current-weather__temp-wrap">
          <span className="current-weather__temp">{current.temp}</span>
          <span className="current-weather__unit">°C</span>
        </div>
      </div>

      <p className="current-weather__condition">{current.condition.label}</p>
      <p className="current-weather__feels-like">
        Feels like {current.feelsLike}°C
      </p>

      <div className="current-weather__details">
        <div className="current-weather__detail-item">
          <div className="detail-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>
          <div className="detail-content">
            <span className="detail-value">{current.humidity}%</span>
            <span className="detail-label">Humidity</span>
          </div>
        </div>

        <div className="current-weather__detail-item">
          <div className="detail-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
          </div>
          <div className="detail-content">
            <span className="detail-value">{current.windSpeed} km/h</span>
            <span className="detail-label">Wind {current.windDirection}</span>
          </div>
        </div>

        <div className="current-weather__detail-item">
          <div className="detail-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </div>
          <div className="detail-content">
            <span className="detail-value">{current.uvIndex}</span>
            <span className="detail-label">UV Index</span>
          </div>
        </div>

        <div className="current-weather__detail-item">
          <div className="detail-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div className="detail-content">
            <span className="detail-value">{current.visibility} km</span>
            <span className="detail-label">Visibility</span>
          </div>
        </div>

        <div className="current-weather__detail-item">
          <div className="detail-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="20" x2="12" y2="10" />
              <line x1="18" y1="20" x2="18" y2="4" />
              <line x1="6" y1="20" x2="6" y2="16" />
            </svg>
          </div>
          <div className="detail-content">
            <span className="detail-value">{current.pressure} hPa</span>
            <span className="detail-label">Pressure</span>
          </div>
        </div>

        <div className="current-weather__detail-item">
          <div className="detail-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
            </svg>
          </div>
          <div className="detail-content">
            <span className="detail-value">{current.dewPoint}°C</span>
            <span className="detail-label">Dew Point</span>
          </div>
        </div>
      </div>

      <p className="current-weather__updated">
        Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </section>
  );
}
