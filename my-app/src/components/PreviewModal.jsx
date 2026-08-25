function PreviewModal({
  theme,
  onClose,
  onUseTheme,
}) {
  if (!theme) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="preview-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <button
          className="close-modal"
          onClick={onClose}
        >
          ×
        </button>

        <div className="modal-image">
          <img
            src={theme.image}
            alt={theme.name}
          />
        </div>

        <div className="modal-details">
          <div className="modal-heading">
            <div>
              <span className="modal-label">
                SHOPIFY THEME
              </span>

              <h2>{theme.name}</h2>
            </div>

            <strong>
              {theme.priceText}
            </strong>
          </div>

          <p>
            {theme.description}
          </p>

          <h3>Features</h3>

          <div className="modal-features">
            {theme.features.map(
              (feature) => (
                <span key={feature}>
                  ✓ {feature}
                </span>
              )
            )}
          </div>

          <div className="modal-actions">
            <button
              className="secondary-button"
              onClick={onClose}
            >
              Continue browsing
            </button>

            <button
              className="primary-button"
              onClick={() =>
                onUseTheme(theme)
              }
            >
              Use this theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;