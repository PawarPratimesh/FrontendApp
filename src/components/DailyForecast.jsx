import './DailyForecast.css';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DailyForecast({ days }) {
  if (!days || days.length === 0) return null;

  // Find min low and max high for the bar visualization
  const allLows = days.map(d => d.low);
  const allHighs = days.map(d => d.high);
  const minTemp = Math.min(...allLows);
  const maxTemp = Math.max(...allHighs);
  const range = maxTemp - minTemp || 1;

  return (
    <section className="daily-forecast glass-card animate-fade-in-up delay-3" id="daily-forecast-section">
      <h2 className="daily-forecast__title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        7-Day Forecast
      </h2>
      <div className="daily-forecast__list">
        {days.map((day, index) => {
          const lowPercent = ((day.low - minTemp) / range) * 100;
          const highPercent = ((day.high - minTemp) / range) * 100;
          const isToday = index === 0;

          return (
            <div
              key={index}
              className={`daily-forecast__row ${isToday ? 'daily-forecast__row--today' : ''}`}
            >
              <span className="daily-forecast__day">
                {isToday ? 'Today' : DAY_NAMES[day.date.getDay()]}
              </span>

              <div className="daily-forecast__condition">
                <span className="daily-forecast__icon">{day.condition.icon}</span>
                <span className="daily-forecast__precip-chance">
                  {day.precipitation > 30 && (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                      {day.precipitation}%
                    </>
                  )}
                </span>
              </div>

              <span className="daily-forecast__low">{day.low}°</span>

              <div className="daily-forecast__bar-container">
                <div
                  className="daily-forecast__bar"
                  style={{
                    left: `${lowPercent}%`,
                    width: `${highPercent - lowPercent}%`,
                  }}
                />
              </div>

              <span className="daily-forecast__high">{day.high}°</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
