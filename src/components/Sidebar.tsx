import React, { useState } from "react";
import { MdList, MdMenu, MdShield } from "react-icons/md";

const Sidebar: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav id="sidebar" className="bg-secondary flex flex-col py-2 px-3">
      <div className="pb-6">
        <button onClick={handleClick}>
          <MdMenu />
        </button>
      </div>
      <ul className="text-copy">
        <li className="py-1">
          <a href="/">
            <div className="flex items-center">
              <MdShield />
              {isOpen && "Team"}
            </div>
          </a>
        </li>
        <li className="py-1">
          <a href="/collection">
            <div className="flex items-center">
              <MdList />
              {isOpen && "Collection"}
            </div>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
