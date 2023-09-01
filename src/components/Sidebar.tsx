import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdChevronLeft,
  MdChevronRight,
  MdList,
  MdShield,
} from "react-icons/md";

interface SidebarLinkProps {
  alert?: boolean;
  icon: React.ReactNode;
  isNavOpen: boolean;
  text: string;
  url: string;
}
const SidebarLink: React.FC<SidebarLinkProps> = ({
  alert,
  icon,
  isNavOpen,
  text,
  url,
}): JSX.Element => {
  return (
    <li className="group">
      <NavLink
        className={({ isActive }) =>
          `relative flex items-center py-2 px-3 my-1 rounded-md cursor-pointer text-copy transition-colors ${
            isActive
              ? "bg-gradient-to-tr from-[#53CAA7] to-[#A1E2CF]"
              : "hover:bg-[#D8F2EB]"
          }`
        }
        to={url}
      >
        <div className="flex items-center">
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              isNavOpen ? "w-32 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-tertiary ${
                isNavOpen ? "" : "top-2"
              }`}
            />
          )}
          {!isNavOpen && (
            <div
              className="absolute left-full rounded-md px-2 py-1 ml-6 
            bg-secondary text-copy text-sm 
            invisible opacity-20 -translate-x-3 transition-all 
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
            >
              {text}
            </div>
          )}
        </div>
      </NavLink>
    </li>
  );
};

const Sidebar: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="min-h-screen">
      <nav className="h-full flex flex-col bg-secondary border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/images/pokemon-logo.png"
            alt="Pokemon logo"
            className={`overflow-hidden transition-all ${
              isOpen ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={handleOpen}
            className="p-1.5 rounded-lg bg-secondary border border-slate-500"
          >
            {isOpen ? <MdChevronLeft /> : <MdChevronRight />}
          </button>
        </div>
        <ul className="flex-1 px-3">
          <SidebarLink
            icon={<MdShield />}
            isNavOpen={isOpen}
            text="Team"
            url="/"
          />
          <SidebarLink
            icon={<MdList />}
            isNavOpen={isOpen}
            text="Collection"
            url="/collection"
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
