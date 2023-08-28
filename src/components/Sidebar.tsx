import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdList, MdMenu, MdShield } from "react-icons/md";

const Sidebar: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      id="sidebar"
      className="bg-secondary min-h-screen flex flex-col py-2 px-3"
    >
      <div className="pb-6">
        <button onClick={handleClick}>
          <MdMenu />
        </button>
      </div>
      <ul className="text-copy">
        <li className="py-1">
          <NavLink to="/">
            <div className="flex items-center">
              <MdShield />
              {isOpen && "Team"}
            </div>
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink to="/collection">
            <div className="flex items-center">
              <MdList />
              {isOpen && "Collection"}
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
