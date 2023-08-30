import React, { createContext, ReactNode, useContext, useState } from "react";
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
  const [toasts, setToasts] = useState<Toast[] | []>([]);

  const open = (component: ReactNode, timeout = 5000) => {
    const id = Date.now();
    setToasts((toasts) => [...toasts, { id, component }]);
    setTimeout(() => close(id), timeout);
  };

  const close = (id: number) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ open, close }} {...props}>
      {children}
      <div className="space-y-2 fixed bottom-4 right-4">
        {toasts.map(({ id, component }) => (
          <div key={id} className="relative">
            <button
              className="absolute top-2 right-2 p-1 rounded-lg bg-gray-200/20 text-gray-800/60"
              onClick={() => close(id)}
            >
              <MdClose color="white" />
            </button>
            {component}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export { useToast, ToastProvider };
