import React, { createContext, ReactNode, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";

type Toast = {
  id: number;
  component: ReactNode;
};

type ToastData = {
  open: (component: ReactNode, timeout?: number) => void;
  close: (id: number) => void;
};

const ToastContext = createContext<ToastData | null>(null);

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.");
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode | ReactNode[];
}

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  ...props
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const open = (component: ReactNode, timeout = 4000) => {
    const id = Date.now();
    setToasts((toasts) => [...toasts, { id, component }]);
    setTimeout(() => close(id), timeout);
  };

  const close = (id: number) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  const toastRoot = document.getElementById("toast-root");

  return (
    <ToastContext.Provider value={{ open, close }} {...props}>
      {children}
      {toastRoot?.parentNode
        ? ReactDOM.createPortal(
            toasts.length ? (
              <div className="fixed z-[2] bottom-4 right-4 space-y-2">
                {toasts.map(({ id, component }) => (
                  <output key={id} className="relative animate-fade-in-out">
                    <button
                      className="absolute top-2 right-2 p-1 rounded-lg bg-gray-200/20 text-gray-800/60"
                      onClick={() => close(id)}
                    >
                      <MdClose color="white" />
                    </button>
                    {component}
                  </output>
                ))}
              </div>
            ) : null,
            toastRoot
          )
        : null}
    </ToastContext.Provider>
  );
};

export { useToast, ToastProvider };
