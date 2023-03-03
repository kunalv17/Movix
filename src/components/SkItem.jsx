import React from 'react'

const SkItem = () => {
  return (
    <div className="relative z-auto">
      <div className="h-[192px] rounded-xl overflow-hidden w-32 z-auto">
        <div className="bg-[#0e223f] h-full w-full z-auto">
          <div className="h-[192px] w-4 animate-tX right-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
      <div className="w-full relative z-auto overflow-hidden">
        <div className="bg-[#0e223f] h-8 w-32 my-2 rounded-xl z-auto overflow-hidden">
          <div className=" h-[32px] w-4 absolute rounded-xl z-auto animate-tX bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="bg-[#0e223f] h-4 w-32  rounded-xl overflow-hidden">
          <div className=" h-[16px] w-4 absolute rounded-xl z-auto animate-tX bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default SkItem;