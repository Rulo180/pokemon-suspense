import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  modalContent: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, modalContent }) => {
  const modalRoot = document.getElementById("modal-root");

  return modalRoot?.parentNode
    ? ReactDOM.createPortal(
        isOpen ? (
          <div
            role="dialog"
            className={`fixed inset-0 z-[1] flex items-center justify-center bg-gray-900/50 ${
              isOpen ? "visible" : "hidden"
            }`}
          >
            <div className="bg-white w-96 p-6 rounded shadow-md">
              {modalContent}
            </div>
          </div>
        ) : null,
        modalRoot
      )
    : null;
};

export default Modal;
