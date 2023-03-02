import ReactDOM from "react-dom";
import style from "./modal.module.css";
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
  }, []);

  const contentModal = (
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${style.container} pt-15 pr-10 pl-10 pb-15`}>
        <header className={style.header}>
          {title && (
            <h2 className={`${style.title} text text_type_main-large`}>
              {title}
            </h2>
          )}
          <button onClick={() => onClose(false)} className={style.closeButton}>
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
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
