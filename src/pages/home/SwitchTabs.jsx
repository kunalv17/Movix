import React, { useState } from "react";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(false);
  
  const handleClick = (item) =>{
    if(item === data?.[1] && !left) {
      setLeft(true);
    }
    else if(item === data?.[0] && left ){
      setLeft(false);
    }
    onTabChange(item);

  }

  return (
    <div className="flex w-[120px] h-[26px] items-center justify-evenly bg-white rounded-3xl relative">
      <div
        className={`absolute w-[60px] h-[22px] bg-gradient-to-r left-[2px] top-[2px] ${left && 'translate-x-[56px]'} duration-75
            from-[#FF8008] to-[#dd3a5d] rounded-3xl `}
      />
      <div onClick={()=>handleClick(data?.[0])} className={`z-10 ${ !left ? "text-white" : "text-black"} text-xs w-[60px] text-center cursor-pointer`}>{data?.[0]}</div>
      <div onClick={()=>handleClick(data?.[1])} className={`z-10 ${ left ? "text-white" : "text-black"} text-xs w-[60px] text-center cursor-pointer`}>{data?.[1]}</div>
    </div>
  );
};

export default SwitchTabs;
