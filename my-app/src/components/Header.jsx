import { useState } from "react";

function Header({
  search,
  setSearch,
  cartCount,
  onCartClick,
}) {
  const [showMobileSearch, setShowMobileSearch] =
    useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <button className="mobile-menu">
          ☰
        </button>

        <a href="/" className="logo">
          <span className="logo-icon">
            S
          </span>

          <span className="logo-text">
            shopify
          </span>

          <span className="logo-themes">
            themes
          </span>
        </a>

        <nav className="navigation">
          <a href="#collections">
            Collections
          </a>

          <a
            href="#themes"
            className="active"
          >
            All themes
          </a>
        </nav>
      </div>

      <div className="header-right">
        <button
          className="search-link"
          onClick={() =>
            setShowMobileSearch(
              !showMobileSearch
            )
          }
        >
          <span className="search-symbol">
            ⌕
          </span>

          Search
        </button>

        <button className="login">
          Log in
        </button>

        <button className="get-started">
          Get started
        </button>

        <button
          className="cart-button"
          onClick={onCartClick}
        >
          Cart

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {showMobileSearch && (
        <div className="mobile-search-box">
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search themes..."
            autoFocus
          />
        </div>
      )}
    </header>
  );
}

export default Header;