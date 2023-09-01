import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  description: string | ReactNode;
  title: string | ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, description, title }) => {
  return (
    <div className="h-full flex flex-col p-6 bg-slate-600 bg-white text-copy text-center md:text-left">
      <h1 className="mb-6 text-xl font-bold">{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
};

export default Layout;
