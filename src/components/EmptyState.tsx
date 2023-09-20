import React, { ReactNode } from "react";

interface EmptyStateProps {
  title: string | ReactNode;
  message: string | ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  title,
}) => {
  return (
    <div className="flex flex-col grow justify-center items-center py-6">
      <div className="pb-4">
        <figure>
          <img
            src="/images/snorlax.png"
            alt="Snorlax sleeping"
            width={300}
            height={200}
          />
        </figure>
      </div>
      <div className="px-6 py-4 rounded bg-slate-100 text-center space-y-1">
        <div className="pb-4">
          <h2 className="text-xl text-primary font-bold">{title}</h2>
        </div>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;
