export const SHOW_MODAL = "ui/SHOW_MODAL";
export const CLOSE_MODAL = "ui/CLOSE_MODAL";

export const showModal = (product) => ({
  type: SHOW_MODAL,
  payload: product,
});
export const closeModal = () => ({ type: CLOSE_MODAL });

const initialState = {
  modal: false,
  current: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        ...state,
        modal: true,
        current: action.payload,
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
