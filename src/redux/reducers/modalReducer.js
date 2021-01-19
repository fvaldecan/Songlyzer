const initalState = {
  showModal: false,
  modalType: "song",
};
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const modal = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL:
      return { showModal: true, modalType: payload.modalType };
    case CLOSE_MODAL:
      return { ...state, showModal: false };
    default:
      return state;
  }
};
export default modal;
