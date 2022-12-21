import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import {
  createCategoryAsync,
  fetchCategoriesAsync,
  selectCategoriesList,
} from "../../../store/categories";
import {
  createProductAsync,
  selectProductsList,
} from "../../../store/products";

import { createRef } from "react";
import { addOrderItem, createOrderAsync } from "../../../store/orders";
import {
  closeModal,
  showAddItemToCartModal,
  showAddNewCategoryModal,
  showAddNewItemModal,
} from "../../../store/ui";
import { formatPrice } from "../../../utils/formatPrice";
import { Modal } from "../../shared/components/Modal";
import { ProductRow } from "./ProductRow";
import "./MenuManager.css";

const initialProductData = {
  name: "",
  category: "",
  price: "",
  description: "",
  imageUrl:
    "https://preview.redd.it/fseqknyvblex.jpg?auto=webp&s=ea4b90dab14cf0e779fd145e5b2ccf878e076d6f",
};

const SANDWICH_ID = "63a321d938a679217e604707";
const SALAD_ID = "63a321d938a679217e604708";
const SOUP_ID = "63a321d938a679217e604709";
const DRINK_ID = "63a321d938a679217e60470a";
const BAKERY_ID = "63a321d938a679217e60470b";

const categories = [
  { id: SANDWICH_ID, title: "🥪 Sandwiches" },
  { id: SALAD_ID, title: "🥗 Salads" },
  { id: SOUP_ID, title: "🥣 Soups" },
  { id: DRINK_ID, title: "🍹 Drinks" },
  { id: BAKERY_ID, title: "🍰 Bakery" },
  // { id: 6, title: "🍟 Sides" },
];

const CATEGORY_IDS = [
  { id: SANDWICH_ID, title: "Sandwiches" },
  { id: SALAD_ID, title: "Salads" },
  { id: SOUP_ID, title: "Soups" },
  { id: DRINK_ID, title: "Drinks" },
  { id: BAKERY_ID, title: "Bakery" },
];

export function MenuManager() {
  const dispatch = useDispatch();

  const [productFormData, setProductFormData] = useState(initialProductData);
  const categoryLoaded = useSelector((state) => state.categories.loaded);

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

  // const allProducts = useSelector(selectProductsList);
  // console.log(allProducts);

  const scrollRefs = CATEGORY_IDS.reduce((prev, curr) => {
    prev[curr.id] = createRef();
    return prev;
  }, {});

  const handleScrollIntoView = (id) => {
    scrollRefs[id]?.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const isNewItemModalOpen = useSelector(
    (state) => state.ui.modal === "add_new_item"
  );
  const isAddItemToCartModalOpen = useSelector(
    (state) => state.ui.modal === "add_item_to_cart"
  );
  const isAddNewCategoryModalOpen = useSelector(
    (state) => state.ui.modal === "add_new_category"
  );
  const currentProductInModal = useSelector((state) => state.products.current);

  const [quantity, setQuantity] = useState(1);
  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleShowModal = () => {
    dispatch(showAddNewItemModal());
  };

  const handleAddProductToCart = (product) => {
    const newItem = {
      id: product._id,
      quantity,
      totalPrice: quantity * product.price,
    };
    dispatch(addOrderItem(newItem));
    handleCloseModal();
  };

  const handleShowAddCategoryModal = () => {
    dispatch(showAddNewCategoryModal());
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
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
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
                    <div> + </div>
                    <div>Drag 'n' drop some files here, </div>
                    <div>or click to select files</div>
                  </div>
                )}
              </div>

              <div>
                <button type="submit" className="save-button">
                  Save
                </button>
              </div>
            </form>
          </div>
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
              <div>
                <button className="save-button" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      <div className="category-list">
        {/* {categories.map((category) => (
          <div
            className="category-item"
            key={category.id}
            role="button"
            onClick={() => handleScrollIntoView(category.id)}
          >
            {category.title}
          </div>
        ))} */}

        <div
          role="button"
          className="new-category"
          onClick={handleShowAddCategoryModal}
        >
          Category +
        </div>

        {/* <Link to={"/menu"}>
          <div role="button" className="new-category">
            Category +
          </div>
        </Link> */}
      </div>
      <div className="ProductsList">
        <div className="category-container">
          {CATEGORY_IDS.map((category) => (
            <ProductRow
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
