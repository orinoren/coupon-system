import React from "react";
import "./MainSearchForm.css";
import { useState } from "react";
import { useSelector } from "react-redux";
const SortBox = (props) => {
  const [maxPrice, setMaxPrice] = useState(100);

  const allCategories = useSelector(
    (state) => state.getAllCategoriesReducer.allCategories
  );
  const handleMaxPriceInputChange = (e) => {
    setMaxPrice(e.target.value);
  };
  return (
    <div className="container-fluid sort-box">
      <div className="row">
        <div className="col-12">
          <div className="container-fluid p-0 m-0">
            <div className="row">
              <div className="col-12">
                <div className="sort-form fw-bolder">
                  <span className="fs-5">Category:</span>
                  <fieldset ref={props.sortInputRef}>
                    {allCategories.map((category) => (
                      <span>
                        <label className="p-2" htmlFor={category.id}>
                          {category.name}
                        </label>
                        <input
                          className="sort-input"
                          type="checkbox"
                          name={category.name}
                          id={category.id}
                        />
                      </span>
                    ))}
                  </fieldset>
                  <br />
                  Max price:
                  <br />
                  <span className="">
                    <input
                      className="w-75"
                      onChange={(e) => handleMaxPriceInputChange(e)}
                      type="range"
                      min="0"
                      max="500"
                      id="max-price-input"
                      ref={props.maxPriceRef}
                      value={maxPrice}
                    />
                    <span className="px-2 fs-5 text-success fw-bold ">
                      {maxPrice}$
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBox;
