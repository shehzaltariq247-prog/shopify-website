function ThemeCard({
  theme,
  onPreview,
  onUseTheme,
}) {
  return (
    <article className="theme-card">
      <div
        className="theme-image-container"
        onClick={() => onPreview(theme)}
      >
        <img
          src={theme.image}
          alt={theme.name}
          className="theme-image"
        />

        <div className="image-hover">
          <button
            className="preview-button"
            onClick={(event) => {
              event.stopPropagation();
              onPreview(theme);
            }}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="theme-info">
        <div className="theme-title-row">
          <div>
            <h2>{theme.name}</h2>

            <p className="theme-author">
              Shopify
            </p>
          </div>

          <strong className="theme-price">
            {theme.priceText}
          </strong>
        </div>

        <p className="theme-description">
          {theme.description}
        </p>

        <div className="theme-tags">
          {theme.tags
            .slice(0, 4)
            .map((tag) => (
              <span
                key={tag}
                className="theme-tag"
              >
                {tag}
              </span>
            ))}
        </div>

        <button
          className="use-button"
          onClick={() =>
            onUseTheme(theme)
          }
        >
          Use this theme
        </button>
      </div>
    </article>
  );
}

export default ThemeCard;