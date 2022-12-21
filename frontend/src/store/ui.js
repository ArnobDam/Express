export const SHOW_ADD_ITEM_TO_CART_MODAL = "ui/SHOW_ADD_ITEM_TO_CART_MODAL";
export const CLOSE_MODAL = "ui/CLOSE_MODAL";

export const showAddItemToCartModal = (product) => ({
  type: SHOW_ADD_ITEM_TO_CART_MODAL,
  payload: product,
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
    case CLOSE_MODAL: {
      return {
        ...state,
        modal: false,
        current: null,
      };
    }
    default:
      return state;
  }
};
