function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            shopify
          </div>

          <p>
            Beautiful storefront experiences
            built with React.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>

          <a href="#themes">
            All themes
          </a>

          <a href="#collections">
            Collections
          </a>

          <a href="#popular">
            Popular
          </a>
        </div>

        <div className="footer-column">
          <h3>Resources</h3>

          <a href="#help">
            Help center
          </a>

          <a href="#developers">
            Developers
          </a>

          <a href="#support">
            Support
          </a>
        </div>

        <div className="footer-column">
          <h3>Company</h3>

          <a href="#about">
            About
          </a>

          <a href="#contact">
            Contact
          </a>

          <a href="#privacy">
            Privacy
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 Theme Marketplace
        </span>

        <span>
          Built with React
        </span>
      </div>
    </footer>
  );
}

export default Footer;