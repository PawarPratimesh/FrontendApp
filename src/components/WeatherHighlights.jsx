import './WeatherHighlights.css';

export default function WeatherHighlights({ current }) {
  if (!current) return null;

  const uvLevel = current.uvIndex <= 2 ? 'Low' : current.uvIndex <= 5 ? 'Moderate' : current.uvIndex <= 7 ? 'High' : 'Very High';
  const uvColor = current.uvIndex <= 2 ? 'var(--color-accent-emerald)' : current.uvIndex <= 5 ? 'var(--color-accent-warm)' : current.uvIndex <= 7 ? 'var(--color-accent-orange)' : 'var(--color-accent-rose)';

  const windLevel = current.windSpeed < 10 ? 'Calm' : current.windSpeed < 20 ? 'Breezy' : current.windSpeed < 30 ? 'Windy' : 'Strong';

  const highlights = [
    {
      title: 'UV Index',
      value: current.uvIndex,
      label: uvLevel,
      icon: (
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
      ),
      progress: (current.uvIndex / 11) * 100,
      color: uvColor,
    },
    {
      title: 'Wind',
      value: `${current.windSpeed} km/h`,
      label: `${windLevel} · ${current.windDirection}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
        </svg>
      ),
      progress: (current.windSpeed / 40) * 100,
      color: 'var(--color-accent)',
    },
    {
      title: 'Humidity',
      value: `${current.humidity}%`,
      label: current.humidity < 40 ? 'Dry' : current.humidity < 70 ? 'Comfortable' : 'Humid',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
      progress: current.humidity,
      color: 'var(--color-accent-violet)',
    },
    {
      title: 'Visibility',
      value: `${current.visibility} km`,
      label: current.visibility > 10 ? 'Excellent' : current.visibility > 5 ? 'Good' : 'Poor',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      progress: (current.visibility / 20) * 100,
      color: 'var(--color-accent-emerald)',
    },
  ];

  return (
    <section className="weather-highlights animate-fade-in-up delay-4" id="weather-highlights-section">
      <h2 className="weather-highlights__title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        Today's Highlights
      </h2>
      <div className="weather-highlights__grid">
        {highlights.map((item, index) => (
          <div key={index} className="highlight-card glass-card">
            <div className="highlight-card__header">
              <div className="highlight-card__icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <span className="highlight-card__title">{item.title}</span>
            </div>
            <div className="highlight-card__value">{item.value}</div>
            <div className="highlight-card__bar-track">
              <div
                className="highlight-card__bar-fill"
                style={{
                  width: `${Math.min(item.progress, 100)}%`,
                  background: item.color,
                }}
              />
            </div>
            <span className="highlight-card__label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
