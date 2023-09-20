import React, { ReactNode } from "react";

interface ToastProps {
  icon: ReactNode;
  message?: string | ReactNode;
  title: string | ReactNode;
  type?: "error" | "info";
}

const Toast: React.FC<ToastProps> = ({
  icon,
  message,
  title,
  type = "info",
}) => {
  return (
    <div
      className={`flex items-center gap-2 text-white p-4 rounded-lg shadow-lg ${
        type === "error" ? "bg-error" : "bg-tertiary"
      }`}
    >
      {icon}
      <div className="flex-flex-column">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
