import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ThemeGrid from "./components/Themegrid";
import PreviewModal from "./components/PreviewModal";
import Footer from "./components/Footer";

import themesData from "./data/themes";

import {
  getProducts,
  createCart,
  shopifyConfigured,
} from "./api/shopify";

function App() {
  const [themes, setThemes] =
    useState(themesData);

  const [loading, setLoading] =
    useState(false);

  const [apiMessage, setApiMessage] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [selectedTheme, setSelectedTheme] =
    useState(null);

  const [cartCount, setCartCount] =
    useState(0);

  const [filters, setFilters] =
    useState({
      industry: "",
      catalog: "",
      price: "",
      features: [],
    });

  /*
    Load Shopify data
  */

  useEffect(() => {
    async function loadShopifyProducts() {
      if (!shopifyConfigured) {
        return;
      }

      try {
        setLoading(true);

        const products =
          await getProducts();

        if (
          !products ||
          products.length === 0
        ) {
          setApiMessage(
            "No Shopify products found. Showing demo themes."
          );

          return;
        }

        const converted =
          products.map(
            (product, index) => {
              return {
                id: product.id,

                name: product.title,

                description:
                  product.description ||
                  "Beautiful Shopify storefront theme.",

                price:
                  Number(
                    product.priceRange
                      ?.minVariantPrice
                      ?.amount
                  ) || 0,

                priceText:
                  Number(
                    product.priceRange
                      ?.minVariantPrice
                      ?.amount
                  ) === 0
                    ? "Free"
                    : `$${Number(
                        product.priceRange
                          ?.minVariantPrice
                          ?.amount
                      ).toFixed(0)} USD`,

                image:
                  product.featuredImage
                    ?.url ||
                  themesData[
                    index %
                      themesData.length
                  ].image,

                industries:
                  product.collections?.nodes?.map(
                    (collection) =>
                      collection.title
                  ) || [],

                tags:
                  product.tags?.length
                    ? product.tags
                    : [
                        "Modern",
                        "Responsive",
                        "Clean",
                      ],

                features: [
                  "Sticky header",
                  "Quick view",
                  "Mega menu",
                ],

                variantId:
                  product.variants
                    ?.nodes?.[0]?.id ||
                  null,
              };
            }
          );

        setThemes(converted);

        setApiMessage(
          "Connected to your Shopify store."
        );
      } catch (error) {
        console.error(error);

        setApiMessage(
          "Shopify API unavailable. Showing demo themes."
        );

        setThemes(themesData);
      } finally {
        setLoading(false);
      }
    }

    loadShopifyProducts();
  }, []);

  /*
    Filter themes
  */

  const filteredThemes = useMemo(() => {
    return themes.filter((theme) => {
      const searchValue =
        search.trim().toLowerCase();

      const searchMatch =
        searchValue === "" ||
        theme.name
          .toLowerCase()
          .includes(searchValue) ||
        theme.description
          .toLowerCase()
          .includes(searchValue) ||
        theme.tags?.some((tag) =>
          tag
            .toLowerCase()
            .includes(searchValue)
        );

      const industryMatch =
        filters.industry === "" ||
        theme.industries?.includes(
          filters.industry
        );

      const priceMatch =
        filters.price === "" ||
        (filters.price === "free"
          ? theme.price === 0
          : theme.price > 0);

      const featureMatch =
        filters.features.length === 0 ||
        filters.features.every(
          (feature) =>
            theme.features?.includes(
              feature
            )
        );

      return (
        searchMatch &&
        industryMatch &&
        priceMatch &&
        featureMatch
      );
    });
  }, [
    themes,
    search,
    filters,
  ]);

  /*
    Clear filters
  */

  function clearFilters() {
    setSearch("");

    setFilters({
      industry: "",
      catalog: "",
      price: "",
      features: [],
    });
  }

  /*
    Use theme
  */

  async function handleUseTheme(theme) {
    if (!theme.variantId) {
      alert(
        `${theme.name} selected. Connect your Shopify Storefront API to enable the real cart.`
      );

      return;
    }

    try {
      const cart =
        await createCart(
          theme.variantId
        );

      setCartCount(
        (previous) => previous + 1
      );

      if (cart.checkoutUrl) {
        const shouldCheckout =
          window.confirm(
            `${theme.name} was added to your Shopify cart.\n\nOpen checkout?`
          );

        if (shouldCheckout) {
          window.location.href =
            cart.checkoutUrl;
        }
      }
    } catch (error) {
      console.error(error);

      alert(
        "Unable to add this item to the Shopify cart."
      );
    }
  }

  return (
    <div className="app">
      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        onCartClick={() =>
          alert(
            `Cart contains ${cartCount} item(s).`
          )
        }
      />

      <main className="main">
        <section className="hero">
          <div>
            <h1>
              Find the perfect theme
            </h1>

            <p>
              Explore our collection of
              professionally designed themes
              for your online store.
            </p>
          </div>

          <div className="theme-count">
            {filteredThemes.length} themes
          </div>
        </section>

        {apiMessage && (
          <div className="api-message">
            <span>●</span>
            {apiMessage}
          </div>
        )}

        <div className="catalog">
          <Sidebar
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
          />

          <section className="catalog-right">
            <div className="toolbar">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search themes"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />

                {search && (
                  <button
                    onClick={() =>
                      setSearch("")
                    }
                  >
                    ×
                  </button>
                )}
              </div>

              <select className="sort">
                <option>
                  Recommended
                </option>

                <option>
                  Price: Low to High
                </option>

                <option>
                  Price: High to Low
                </option>

                <option>
                  Most Popular
                </option>
              </select>
            </div>

            <ThemeGrid
              themes={filteredThemes}
              loading={loading}
              onPreview={setSelectedTheme}
              onUseTheme={handleUseTheme}
            />
          </section>
        </div>
      </main>

      <Footer />

      <PreviewModal
        theme={selectedTheme}
        onClose={() =>
          setSelectedTheme(null)
        }
        onUseTheme={(theme) => {
          setSelectedTheme(null);
          handleUseTheme(theme);
        }}
      />
    </div>
  );
}

export default App;