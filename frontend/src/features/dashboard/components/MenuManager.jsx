import React, { useEffect, useState, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import {
  clearCategoriesErrors,
  createCategoryAsync,
  fetchCategoriesAsync,
  selectCategoriesListForRow,
} from "../../../store/categories";
import {
  clearCurrent,
  clearProductsErrors,
  createProductAsync,
  selectCurrentProduct,
} from "../../../store/products";

import { createRef } from "react";
import {
  closeModal,
  selectIsAddCategoryModalOpen,
  selectIsAddNewProductModalOpen,
  selectIsEditProductModalOpen,
  showAddNewCategoryModal,
} from "../../../store/ui";
import { Modal } from "../../shared/components/Modal";
import { ProductCard } from "./ProductCard";
import "./MenuManager.css";
import { EditForm } from "./EditForm";
import { formatCategoryTitle } from "../../../utils/formatCategoryTitle";

const initialProductData = {
  name: "",
  category: "",
  price: "",
  description: "",
  imageUrl: "",
};

// const SANDWICH_ID = "63a47615ad6d4fe86b6daf6f";
// const SALAD_ID = "63a47615ad6d4fe86b6daf70";
// const SOUP_ID = "63a47615ad6d4fe86b6daf71";
// const DRINK_ID = "63a47615ad6d4fe86b6daf72";
// const BAKERY_ID = "63a47615ad6d4fe86b6daf73";

// const categories = [
//   { id: SANDWICH_ID, title: "🥪 Sandwiches" },
//   { id: SALAD_ID, title: "🥗 Salads" },
//   { id: SOUP_ID, title: "🥣 Soups" },
//   { id: DRINK_ID, title: "🍹 Drinks" },
//   { id: BAKERY_ID, title: "🍰 Bakery" },
//   // { id: 6, title: "🍟 Sides" },
// ];

// const CATEGORY_IDS = [
//   { id: SANDWICH_ID, title: "Sandwiches" },
//   { id: SALAD_ID, title: "Salads" },
//   { id: SOUP_ID, title: "Soups" },
//   { id: DRINK_ID, title: "Drinks" },
//   { id: BAKERY_ID, title: "Bakery" },
// ];

export function MenuManager() {
  const dispatch = useDispatch();
  const categoriesList = useSelector(selectCategoriesListForRow, shallowEqual);

  const productToEdit = useSelector(selectCurrentProduct);

  const [productFormData, setProductFormData] = useState(initialProductData);

  const categoryLoaded = useSelector((state) => state.categories.loaded);

  const onDrop = useCallback((acceptedFiles) => {
    setProductFormData((prev) => ({ ...prev, imageUrl: acceptedFiles[0] }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const productErrors = useSelector((state) => state.errors.products);
  const categoryErrors = useSelector((state) => state.errors.categories);

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
    dispatch(clearProductsErrors());
    const newProduct = {
      ...productFormData,
    };

    const formData = new FormData();
    formData.set("name", newProduct.name);
    formData.set("description", newProduct.description);
    formData.set("price", newProduct.price);
    formData.set("category", newProduct.category);
    formData.set("price", newProduct.price * 100);
    newProduct.imageUrl &&
      formData.set("image", newProduct.imageUrl, newProduct.imageUrl.name);

    dispatch(createProductAsync(formData));
    if (!productErrors) {
      resetProductForm();
      handleCloseModal();
    }
  };

  // const categories = useSelector(selectCategoriesList);

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
    dispatch(clearCategoriesErrors());
    const newCategory = { title: categoryTitle };
    dispatch(createCategoryAsync(newCategory));
    if (!categoryErrors) {
      setCategoryTitle("");
      handleCloseModal();
    }
  };

  const scrollRefs = categoriesList.reduce((prev, curr) => {
    prev[curr.id] = createRef();
    return prev;
  }, {});

  const handleScrollIntoView = (id) => {
    scrollRefs[id]?.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const isNewItemModalOpen = useSelector(selectIsAddNewProductModalOpen);

  const isAddNewCategoryModalOpen = useSelector(selectIsAddCategoryModalOpen);

  const handleShowAddCategoryModal = () => {
    dispatch(showAddNewCategoryModal());
  };

  const isEditProductModalOpen = useSelector(selectIsEditProductModalOpen);

  const handleCloseModal = () => {
    resetProductForm();
    dispatch(closeModal());
    dispatch(clearCurrent());
    dispatch(clearProductsErrors());
    dispatch(clearCategoriesErrors());
  };

  return (
    <div className="Menu" style={{ position: "relative" }}>
      {isNewItemModalOpen && (
        <Modal className="product-modal">
          <div className="NewProductForm">
            <form onSubmit={handleProductSubmit} encType="multipart/form-data">
              <h2 className="modal-title">Add new product</h2>
              <div>
                <input
                  className="product-form-input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={productFormData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <select
                  className="select-option"
                  name="category"
                  id="category"
                  value={productFormData.category}
                  onChange={handleChange}
                >
                  <option value="" key="">
                    Select category
                  </option>
                  {categoriesList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {formatCategoryTitle(category)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  className="product-form-input"
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={productFormData.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="product-form-input"
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={productFormData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="pic-input" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div>Drop the files here ...</div>
                ) : (
                  <div className="photo-content">
                    <div className="add-photo"> + </div>
                    <div>Drag 'n' drop some files here, </div>
                    <div>or click to select files</div>
                  </div>
                )}
              </div>

              <div className="form-buttons">
                <div>
                  <button type="submit" className="save-button">
                    Save
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              {/* TODO: */}
              <div
                style={{
                  color: "var(--error-red)",
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "12px",
                }}
              >
                {productErrors && productErrors.message}
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {isEditProductModalOpen && productToEdit && (
        <Modal className="product-modal">
          <EditForm categories={categoriesList} productToEdit={productToEdit} />
        </Modal>
      )}

      {isAddNewCategoryModalOpen && (
        <Modal className="category-modal">
          <div className="NewCategoryForm">
            <form onSubmit={handleCategorySubmit}>
              <h1 className="add-category-title">Add new Category</h1>
              <div>
                <input
                  className="title-input"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={categoryTitle}
                  onChange={(e) => setCategoryTitle(e.target.value)}
                />
              </div>
              <div className="category-buttons">
                <div>
                  <button className="save-button" type="submit">
                    Save
                  </button>
                </div>
                <div>
                  <div>
                    <button
                      className="cancel-button"
                      type="button"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {/* TODO: */}
            <div
              style={{
                color: "var(--error-red)",
                fontSize: "12px",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              {categoryErrors && categoryErrors.title}
            </div>
          </div>
        </Modal>
      )}

      <div className="category-list">
        {categoriesList.map((category) => (
          <div
            className="category-item"
            key={category.id}
            role="button"
            onClick={() => handleScrollIntoView(category.id)}
          >
            {formatCategoryTitle(category)}
          </div>
        ))}

        <div
          role="button"
          className="new-category"
          onClick={handleShowAddCategoryModal}
        >
          Category +
        </div>
      </div>
      <div className="ProductsList">
        <div className="category-container">
          {categoriesList.map((category) => (
            <ProductCard
              key={category.id}
              create={true}
              ref={scrollRefs[category.id]}
              title={category.title}
              categoryId={category.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
