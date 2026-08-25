import ThemeCard from "./Themecard.jsx";

function ThemeGrid({
  themes = [],
  loading = false,
  onPreview,
  onUseTheme,
}) {
  if (loading) {
    return (
      <div className="theme-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="loading-card" key={index}>
            <div className="loading-image"></div>

            <div className="loading-content">
              <div className="loading-line big"></div>
              <div className="loading-line"></div>
              <div className="loading-line small"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (themes.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">⌕</div>

        <h2>No themes found</h2>

        <p>
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="theme-grid">
      {themes.map((theme) => (
        <ThemeCard
          key={theme.id}
          theme={theme}
          onPreview={onPreview}
          onUseTheme={onUseTheme}
        />
      ))}
    </div>
  );
}

export default ThemeGrid;