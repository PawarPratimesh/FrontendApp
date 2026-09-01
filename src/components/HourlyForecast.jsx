import './HourlyForecast.css';

export default function HourlyForecast({ hours }) {
  if (!hours || hours.length === 0) return null;

  function formatHour(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  return (
    <section className="hourly-forecast glass-card animate-fade-in-up delay-2" id="hourly-forecast-section">
      <h2 className="hourly-forecast__title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Hourly Forecast
      </h2>
      <div className="hourly-forecast__scroll">
        <div className="hourly-forecast__track">
          {hours.slice(0, 24).map((hour, index) => (
            <div
              key={index}
              className={`hourly-forecast__item ${index === 0 ? 'hourly-forecast__item--now' : ''}`}
            >
              <span className="hourly-forecast__time">
                {index === 0 ? 'Now' : formatHour(hour.time)}
              </span>
              <span className="hourly-forecast__icon">{hour.condition.icon}</span>
              <span className="hourly-forecast__temp">{hour.temp}°</span>
              <div className="hourly-forecast__precip">
                <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                <span>{hour.precipitation}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
