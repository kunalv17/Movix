import React from "react";

const ContentWrapper = ({ children }) => {
  return (
    <div className="w-[100%] m-w-[1200px] mx-auto my-0 py-0 px-[20px]">
      {children}
    </div>
  );
};

export default ContentWrapper;
