import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import {
  createCategoryAsync,
  fetchCategoriesAsync,
  selectCategoriesList,
} from "../../../store/categories";
import { createProductAsync } from "../../../store/products";

const initialProductData = {
  name: "",
  category: "",
  price: "",
  description: "",
  imageUrl:
    "https://preview.redd.it/fseqknyvblex.jpg?auto=webp&s=ea4b90dab14cf0e779fd145e5b2ccf878e076d6f",
};

export function MenuManager() {
  const [productFormData, setProductFormData] = useState(initialProductData);
  const categoryLoaded = useSelector((state) => state.categories.loaded);
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    setProductFormData((prev) => ({ ...prev, imageUrl: acceptedFiles[0] }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleChange = (event) => {
    setProductFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const resetProductForm = () => {
    setProductFormData(initialProductData);
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
    dispatch(createProductAsync(newProduct)).then(() => {
      // TODO:
      alert("Success, product created");
      resetProductForm();
    });
  };

  const categories = useSelector(selectCategoriesList);

  useEffect(() => {
    if (!categoryLoaded) {
      dispatch(fetchCategoriesAsync());
    }
  }, [dispatch, categoryLoaded]);

  const [categoryTitle, setCategoryTitle] = useState("");

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleCategorySubmit = (event) => {
    event.preventDefault();
    const newCategory = { title: categoryTitle };
    dispatch(createCategoryAsync(newCategory)).then((res) => {
      //TODO:
      alert("Success, category created");
      setCategoryTitle("");
    });
  };

  return (
    <div className="Menu">
      <h1>Menu</h1>
      <div className="NewProductForm">
        <form onSubmit={handleProductSubmit} encType="multipart/form-data">
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
              onChange={handleChange}
            >
              <option value="" key="">
                Select category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
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
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>

          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>

      <br />
      <br />
      <br />
      <div className="NewCategoryForm">
        <form onSubmit={handleCategorySubmit}>
          <h1>Add new Category</h1>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>

      <div>
        <hr />
        <h2>Categories</h2>
        {categories.map((category) => (
          <p key={category._id}>{category.title}</p>
        ))}
      </div>
    </div>
  );
}
