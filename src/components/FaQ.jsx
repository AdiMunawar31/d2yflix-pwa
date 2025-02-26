import React from "react";

const FaQ = () => {
  return (
    <div className="min-h-screen bg-black space-y-10">
      <p className="p-5 text-white font-bold text-5xl flex justify-center">
        Frequently Asked Questions
      </p>
      <div className="space-y-5 flex flex-col justify-center items-center">
        <div className="p-5 bg-[#303030] w-3/4">
          <p className="text-3xl text-white">What is D2YFLIX ?</p>
        </div>
        <div className="p-5 bg-[#303030] w-3/4">
          <p className="text-3xl text-white">How much does D2YFLIX cost ?</p>
        </div>
        <div className="p-5 bg-[#303030] w-3/4">
          <p className="text-3xl text-white">Where can I watch ?</p>
        </div>
        <div className="p-5 bg-[#303030] w-3/4">
          <p className="text-3xl text-white">Is D2YFLIX good for kids ?</p>
        </div>
      </div>
    </div>
  );
};

export default FaQ;
