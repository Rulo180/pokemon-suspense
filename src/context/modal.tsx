import React, { createContext, ReactNode, useContext, useState } from "react";
import Modal from "../components/Modal";

type ModalContextData = {
  isOpen: boolean;
  openModal: (modalContent: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextData | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider.");
  }

  return context;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (modalContent: ReactNode) => {
    setIsOpen(true);
    setModalContent(modalContent);
  };
  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
      {...props}
    >
      <Modal isOpen={isOpen} modalContent={modalContent} />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModal };
