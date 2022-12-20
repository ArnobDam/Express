import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesAsync,
  selectCategoriesList,
} from "../../../store/categories";

const initialProductData = {
  name: "",
  category: "",
  price: "",
  description: "",
  imageUrl: "",
};

export function MenuManager() {
  const [productFormData, setProductFormData] = useState(initialProductData);
  const categoryLoaded = useSelector((state) => state.categories.loaded);
  const dispatch = useDispatch();

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleChange = (event) => {
    setProductFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleProductSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      ...productFormData,
    };
    console.log(newProduct);
  };

  const categories = useSelector(selectCategoriesList);

  useEffect(() => {
    if (!categoryLoaded) {
      dispatch(fetchCategoriesAsync());
    }
  }, [dispatch, categoryLoaded]);

  return (
    <div className="Menu">
      <h1>Menu</h1>
      <div>
        <form onSubmit={handleProductSubmit}>
          <h2>Add new product</h2>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={productFormData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <select
              name="category"
              id="category"
              value={productFormData.category}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={productFormData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productFormData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}