import React from "react";

const Loader: React.FC = (): JSX.Element => {
  return (
    <div className="flex absolute w-full h-full justify-center items-center">
      <span className="inline-block w-3 h-3 rounded-md bg-slate-300 my-auto mx-2 animate-ping delay-500" />
      <span className="inline-block w-3 h-3 rounded-md bg-slate-400 my-auto mx-2 animate-ping delay-200" />
      <span className="inline-block w-3 h-3 rounded-md bg-slate-500 my-auto mx-2 animate-ping" />
    </div>
  );
};

export default Loader;
