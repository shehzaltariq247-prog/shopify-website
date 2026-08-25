function Sidebar({
  filters,
  setFilters,
  clearFilters,
}) {
  const industries = [
    "Fashion",
    "Home",
    "Beauty",
    "Food",
    "Arts",
    "Lifestyle",
  ];

  const features = [
    "Age verifier",
    "Back-to-top button",
    "Before/after image slider",
    "Sticky header",
    "Mega menu",
    "Quick view",
    "Animation",
  ];

  function selectIndustry(industry) {
    setFilters((previous) => ({
      ...previous,
      industry:
        previous.industry === industry
          ? ""
          : industry,
    }));
  }

  function selectFeature(feature) {
    setFilters((previous) => {
      const alreadySelected =
        previous.features.includes(feature);

      return {
        ...previous,

        features: alreadySelected
          ? previous.features.filter(
              (item) => item !== feature
            )
          : [
              ...previous.features,
              feature,
            ],
      };
    });
  }

  return (
    <aside className="sidebar">
      <section className="filter-section">
        <h3>Industry</h3>

        {industries.map((industry) => (
          <label
            className="filter-option"
            key={industry}
          >
            <input
              type="checkbox"
              checked={
                filters.industry === industry
              }
              onChange={() =>
                selectIndustry(industry)
              }
            />

            <span>{industry}</span>
          </label>
        ))}
      </section>

      <section className="filter-section">
        <h3>Catalog size</h3>

        <label className="filter-option">
          <input
            type="radio"
            name="catalog"
            checked={
              filters.catalog === "1-19"
            }
            onChange={() =>
              setFilters((previous) => ({
                ...previous,
                catalog: "1-19",
              }))
            }
          />

          <span>1–19 products</span>
        </label>

        <label className="filter-option">
          <input
            type="radio"
            name="catalog"
            checked={
              filters.catalog === "10-199"
            }
            onChange={() =>
              setFilters((previous) => ({
                ...previous,
                catalog: "10-199",
              }))
            }
          />

          <span>10–199 products</span>
        </label>

        <label className="filter-option">
          <input
            type="radio"
            name="catalog"
            checked={
              filters.catalog === "200+"
            }
            onChange={() =>
              setFilters((previous) => ({
                ...previous,
                catalog: "200+",
              }))
            }
          />

          <span>200+ products</span>
        </label>
      </section>

      <section className="filter-section">
        <h3>Features</h3>

        {features.map((feature) => (
          <label
            className="filter-option"
            key={feature}
          >
            <input
              type="checkbox"
              checked={filters.features.includes(
                feature
              )}
              onChange={() =>
                selectFeature(feature)
              }
            />

            <span>{feature}</span>
          </label>
        ))}
      </section>

      <section className="filter-section">
        <h3>Price</h3>

        <label className="filter-option">
          <input
            type="radio"
            name="price"
            checked={
              filters.price === "free"
            }
            onChange={() =>
              setFilters((previous) => ({
                ...previous,
                price: "free",
              }))
            }
          />

          <span>Free</span>
        </label>

        <label className="filter-option">
          <input
            type="radio"
            name="price"
            checked={
              filters.price === "paid"
            }
            onChange={() =>
              setFilters((previous) => ({
                ...previous,
                price: "paid",
              }))
            }
          />

          <span>Paid</span>
        </label>
      </section>

      <button
        className="clear-button"
        onClick={clearFilters}
      >
        Clear all filters
      </button>
    </aside>
  );
}

export default Sidebar;