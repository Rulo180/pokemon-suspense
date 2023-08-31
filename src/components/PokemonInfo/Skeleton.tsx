import React from "react";

const Skeleton: React.FC = (): JSX.Element => {
  return (
    <div className="w-full mx-auto">
      <div className="animate-pulse flex flex-col">
        <div className="w-full mb-6">
          <div className="w-1/3 h-5 bg-slate-300 rounded mx-auto"></div>
        </div>

        <div className="flex gap-5 my-5">
          <div className="bg-slate-300 h-[350px] w-1/2"></div>
          <div className="flex flex-col w-1/2">
            <div className="bg-slate-300 rounded-lg h-[250px] mb-5"></div>
            <div className="px-2 py-3 space-y-6 ml-0">
              <div className="h-5 bg-slate-300 rounded w-1/4"></div>
              <div className="grid grid-cols-6 gap-3 pb-4">
                <div className="h-4 bg-slate-300 rounded"></div>
              </div>
              <div className="h-5 bg-slate-300 rounded w-1/4"></div>
              <div className="grid grid-cols-6 gap-3 pb-4">
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="h-4 bg-slate-300 rounded"></div>
              </div>
              <div className="h-5 bg-slate-300 rounded w-1/4"></div>
              <div className="grid grid-cols-6 gap-3 pb-4">
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="h-4 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
