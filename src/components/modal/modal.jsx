import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({ children, onClose, title = "" }) => {
  const modalRoot = document.getElementById("react-modals");

  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose(false);
      }
    };

    document.addEventListener("keyup", handleEscape);
    return () => {
      document.removeEventListener("keyup", handleEscape);
    };
  });

  const contentModal = (
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${modalStyles.container} pt-15 pr-10 pl-10 pb-15`}>
        <header className={modalStyles.header}>
          {title && (
            <h2 className={`${modalStyles.title} text text_type_main-large`}>
              {title}
            </h2>
          )}
          <button
            onClick={() => onClose(false)}
            className={modalStyles.closeButton}
          >
            <CloseIcon type="primary" />
          </button>
        </header>
        {children}
      </div>
    </>
  );

  return ReactDOM.createPortal(contentModal, modalRoot);
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
