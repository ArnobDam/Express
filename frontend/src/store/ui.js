export const SHOW_ADD_ITEM_TO_CART_MODAL = "ui/SHOW_ADD_ITEM_TO_CART_MODAL";
export const SHOW_ADD_NEW_ITEM_MODAL = "ui/SHOW_ADD_NEW_ITEM_MODAL";
export const SHOW_ADD_NEW_CATEGORY_MODAL = "ui/SHOW_ADD_NEW_CATEGORY_MODAL";
export const EDIT_PRODUCT_MODAL = "ui/EDIT_PRODUCT_MODAL";
export const CLOSE_MODAL = "ui/CLOSE_MODAL";

export const showAddItemToCartModal = (product) => ({
  type: SHOW_ADD_ITEM_TO_CART_MODAL,
  payload: product,
});
export const showAddNewItemModal = (product) => ({
  type: SHOW_ADD_NEW_ITEM_MODAL,
  payload: product,
});
export const showAddNewCategoryModal = () => ({
  type: SHOW_ADD_NEW_CATEGORY_MODAL,
});

export const showEditProductModal = (productToEdit) => ({
  type: EDIT_PRODUCT_MODAL,
  payload: productToEdit,
});

export const closeModal = () => ({ type: CLOSE_MODAL });

const initialState = {
  modal: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ADD_ITEM_TO_CART_MODAL: {
      return {
        ...state,
        modal: "add_item_to_cart",
      };
    }
    case SHOW_ADD_NEW_ITEM_MODAL: {
      return {
        ...state,
        modal: "add_new_item",
      };
    }
    case SHOW_ADD_NEW_CATEGORY_MODAL: {
      return {
        ...state,
        modal: "add_new_category",
      };
    }
    case EDIT_PRODUCT_MODAL: {
      return {
        ...state,
        modal: "edit_item",
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modal: null,
      };
    }
    default:
      return state;
  }
};

export const selectIsAddNewItemToCartModalOpen = (state) =>
  state.ui.modal === "add_item_to_cart";
export const selectIsAddCategoryModalOpen = (state) =>
  state.ui.modal === "add_new_category";
export const selectIsAddNewProductModalOpen = (state) =>
  state.ui.modal === "add_new_item";
export const selectIsEditProductModalOpen = (state) =>
  state.ui.modal === "edit_item";
