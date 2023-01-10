import React, { useEffect, useState, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  clearCategoriesErrors,
  createCategoryAsync,
  fetchCategoriesAsync,
  selectCategoriesListForRow,
} from "../../../store/categories";
import {
  clearProductsErrors,
  createProductAsync,
  selectCurrentProduct,
  updateProductAsync,
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
import { formatCategoryTitle } from "../../../utils/formatCategoryTitle";
import { ModalForm } from "./ModalForm";

const initialProductData = {
  name: "",
  category: "",
  price: "",
  description: "",
  imageUrl: "",
};

export function MenuManager() {
  const dispatch = useDispatch();
  const categoriesList = useSelector(selectCategoriesListForRow, shallowEqual);

  const productToEdit = useSelector(selectCurrentProduct);
  const [productFormData, setProductFormData] = useState(initialProductData);

  useEffect(() => {
    if (productToEdit !== null) {
      setProductFormData({
        name: productToEdit?.name,
        category: productToEdit?.category,
        price: (productToEdit?.price / 100).toFixed(2),
        description: productToEdit?.description,
        imageUrl: productToEdit?.imageUrl,
      });
    }
  }, [productToEdit]);

  const categoryLoaded = useSelector((state) => state.categories.loaded);

  const onDrop = useCallback((acceptedFiles) => {
    setProductFormData((prev) => ({ ...prev, imageUrl: acceptedFiles[0] }));
  }, []);

  const productErrors = useSelector((state) => state.errors.products);
  const categoryErrors = useSelector((state) => state.errors.categories);

  const isModalClosed = useSelector((state) => state.ui.modal === null);

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleChange = (event) => {
    if (event.target.name === "price") {
      setProductFormData((prev) => ({
        ...prev,
        price: parseFloat(event.target.value).toFixed(2),
      }));
    }
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

    if (Number.isNaN(parseFloat(newProduct.price))) {
      return;
    }

    const formData = new FormData();
    formData.set("name", newProduct.name);
    formData.set("description", newProduct.description);
    formData.set("price", newProduct.price);
    formData.set("category", newProduct.category);
    formData.set("price", parseFloat(newProduct.price * 100));
    newProduct.imageUrl &&
      formData.set("image", newProduct.imageUrl, newProduct.imageUrl.name);

    dispatch(createProductAsync(formData)).then((res) => {
      if (res.statusCode >= 400) {
        return;
      }
      handleCloseModal();
    });
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleProductUpdate = (event) => {
    event.preventDefault();
    dispatch(
      updateProductAsync({
        ...productToEdit,
        ...productFormData,
        price: productFormData.price * 100,
      })
    ).then((res) => {
      if (res.statusCode >= 400) {
        return;
      }
      handleCloseModal();
    });
  };

  useEffect(() => {
    if (!categoryLoaded) {
      dispatch(fetchCategoriesAsync());
    }
  }, [dispatch, categoryLoaded]);

  const [categoryTitle, setCategoryTitle] = useState("");

  const handleCloseModal = () => {
    dispatch(clearProductsErrors());
    dispatch(clearCategoriesErrors());
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isModalClosed) {
      resetProductForm();
    }
  }, [isModalClosed]);

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

  const isAddNewProductModalOpen = useSelector(selectIsAddNewProductModalOpen);

  const isAddNewCategoryModalOpen = useSelector(selectIsAddCategoryModalOpen);

  const handleShowAddCategoryModal = () => {
    dispatch(showAddNewCategoryModal());
  };

  const isEditProductModalOpen = useSelector(selectIsEditProductModalOpen);

  return (
    <div className="Menu" style={{ position: "relative" }}>
      {isAddNewProductModalOpen && (
        <ModalForm
          formId="add-new-product"
          modalClassName="product-modal"
          formBodyClassName="NewProductForm"
          title="Add new product"
          errors={productErrors}
          onChange={handleChange}
          onDrop={onDrop}
          onClose={handleCloseModal}
          formData={productFormData}
          onSubmit={handleProductSubmit}
        />
      )}

      {/* EDIT MODAL */}
      {isEditProductModalOpen && productToEdit && (
        <ModalForm
          formId="edit-product"
          modalClassName="product-modal"
          formBodyClassName="EditProductForm"
          title="Edit product"
          errors={productErrors}
          onChange={handleChange}
          onClose={handleCloseModal}
          onDrop={onDrop}
          formData={productFormData}
          onSubmit={handleProductUpdate}
        />
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
