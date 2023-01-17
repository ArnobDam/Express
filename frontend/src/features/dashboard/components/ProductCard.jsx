import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrent,
  removeProductAsync,
  selectProductsByCategory,
} from "../../../store/products";
import {
  showAddNewItemModal,
  showAddItemToCartModal,
  showEditProductModal,
} from "../../../store/ui";
import { formatPrice } from "../../../utils/formatPrice";
import "./ProductCard.css";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { Slide } from "pure-react-carousel";
import { Carousel } from "./Carousel";

export const ProductCard = forwardRef(
  ({ title, categoryId, create = false }, ref) => {
    const products = useSelector((state) =>
      selectProductsByCategory(state, categoryId)
    );

    let productsToList = create
      ? products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : products;

    const dispatch = useDispatch();

    const handleShowAddProductModal = (product) => {
      dispatch(showAddItemToCartModal(product));
    };

    const handleOpenAddNewModal = () => {
      dispatch(clearCurrent());
      dispatch(showAddNewItemModal());
    };

    const handleRemoveProduct = (productId) => {
      dispatch(removeProductAsync(productId));
    };

    const handleOpenEditProductModal = (productToEdit) => {
      dispatch(showEditProductModal(productToEdit));
    };

    return (
      <>
        <div className="ProductRow" ref={ref}>
          <div className="item-by-name">
            <div className="category-title">
              <div className="category-name">{title}</div>
              {create && (
                <div
                  role="button"
                  className="add-new-btn"
                  onClick={handleOpenAddNewModal}
                >
                  + Add new dish
                </div>
              )}
            </div>
            <div className="item-container-meanager">
              {/* {create && (
                <div
                  className="item add-new-product"
                  role="button"
                  onClick={handleOpenAddNewModal}
                >
                  <div className="add-button">+</div>
                  <div>Add new dish</div>
                </div>
              )} */}
              <Carousel itemLength={productsToList.length}>
                {productsToList.map((product) => (
                  <React.Fragment key={product._id}>
                    <Slide>
                      <div
                        className="product-card-item"
                        onClick={() =>
                          create ? () => {} : handleShowAddProductModal(product)
                        }
                      >
                        <img
                          className="food-image"
                          src={product.imageUrl}
                          alt={product.name}
                        />
                        <div className="menu-name">{product.name}</div>
                        <div className="item-price">
                          {formatPrice(product.price)}
                        </div>
                        <div className="edit-and-delete">
                          <div
                            className="product-card-edit"
                            role="button"
                            onClick={() => handleOpenEditProductModal(product)}
                          >
                            <RiEdit2Fill />
                          </div>
                          <div
                            className="product-card-delete"
                            role="button"
                            onClick={() => handleRemoveProduct(product._id)}
                          >
                            <RiDeleteBin5Fill />
                          </div>
                        </div>
                      </div>
                    </Slide>
                  </React.Fragment>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </>
    );
  }
);
