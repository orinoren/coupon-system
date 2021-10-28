import React from "react";
import "./MainSearchForm.css";
import { useState } from "react";
const SortBox = () => {
  const [maxPrice, setMaxPrice] = useState(0);

  const handleMaxPriceInputChange = (e) => {
    setMaxPrice(e.target.value);
  };
  return (
    <div className="container-fluid sort-box">
      <div className="row">
        <div className="col-12">
          <div className="sort-form">
            Category:
            <fieldset>
              <label className="p-2" htmlFor="1">
                Food
              </label>
              <input
                className="sort-input"
                type="checkbox"
                name="Food"
                id="1"
              />
              <label className="p-2" htmlFor="2">
                Electricty
              </label>
              <input
                className="sort-input"
                type="checkbox"
                name="Electricity"
                id="2"
              />
              <label className="p-2" htmlFor="3">
                Restaurant
              </label>
              <input
                className="sort-input"
                type="checkbox"
                name="restaurant"
                id="3"
              />

              <label className="p-2" htmlFor="4">
                Vacataion
              </label>
              <input
                className="sort-input"
                type="checkbox"
                name="Vacataion"
                id="4"
              />
              <label className="p-2" htmlFor="5">
                Home products
              </label>
              <input
                className="sort-input"
                type="checkbox"
                name="Home products"
                id="5"
              />
              <label className="p-2" htmlFor="6">
                Clothing products
              </label>
              <input
                className="sort-input"
                type="checkbox"
                name="Clothing products"
                id="6"
              />
            </fieldset>
            <br />
            Max price:
            <br />
            <span className="py-5 ">
              <input
                className="w-75"
                onChange={(e) => handleMaxPriceInputChange(e)}
                type="range"
                min="0"
                max="5000"
                id="max-price-input"
              />
              <span className="px-2 fs-5 text-success fw-bold ">
                {maxPrice}$
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBox;
