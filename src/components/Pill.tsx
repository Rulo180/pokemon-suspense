import React from "react";

interface PillProps {
  text: string;
  color?: string;
}

const Pill: React.FC<PillProps> = ({ text, color }) => {
  return (
    <span
      className={`inline-block px-2 py-1 text-sm rounded-full bg-slate-200 border border-slate-400 text-copy`}
    >
      {text}
    </span>
  );
};

export default Pill;
