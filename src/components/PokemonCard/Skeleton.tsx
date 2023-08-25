import React from "react";

const Skeleton: React.FC = (): JSX.Element => {
  return (
    <div className="border border-blue-200 shadow rounded-md max-w-sm w-full mx-auto">
      <div className="animate-pulse flex flex-col space-x-4">
        <div className="bg-slate-300 h-[190px] w-full"></div>
        <div className="px-2 py-3 space-y-6 ml-0">
          <div className="h-3 bg-slate-300 rounded"></div>
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-4 bg-slate-300 rounded"></div>
              <div className="h-4 bg-slate-300 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-6 bg-slate-300 rounded"></div>
              <div className="h-6 bg-slate-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
