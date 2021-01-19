import React from "react";
import ReactDOM from "react-dom";
import SongSelect from "../SongSelectMenu/SongSelect";
import WidgetSelect from "../WidgetSelectMenu/WidgetSelect";
import FocusTrap from "focus-trap-react";
import "./Modal.css";
import { useDispatch } from "react-redux";

export const Modal = ({
  modalType,
  // onClickOutside,
  modalRef,
  buttonRef,
  // closeModal,
  onSubmitSong,
  menuType,
  songMap,
  songList,
  currentSingleSong,
  isSingle,
  onSubmitWidget,
}) => {
  const dispatch = useDispatch();
  const toggleScrollLock = () => {
    document.querySelector("html").classList.toggle("scroll-lock");
  };
  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
      payload: {
        showModal: false,
      },
    });
    toggleScrollLock();
  };

  // const onClickOutside = (event) => {
  //   if (this.modal && this.modal.contains(event.target)) return;
  //   closeModal();
  // };
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-modal="true"
        className="modal-cover"
        // onClick={onClickOutside}
      >
        <div className="modal-area" ref={modalRef}>
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div className="modal-body">
            {modalType === "song" ? (
              <SongSelect />
            ) : (
              <WidgetSelect
                song_map={songMap}
                // song_list={songList}
                current_single_song={currentSingleSong}
                is_single={isSingle}
                onSubmit={onSubmitWidget}
              />
            )}
          </div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};
export default Modal;
