import React from "react";

const Banner = () => {
  return (
    <div>
      <div
        className="h-screen flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)), url("https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/2fe6e3c0-5613-4625-a0c1-3d605effd10b/IN-en-20210607-popsignuptwoweeks-perspective_alpha_website_large.jpg")',
        }}
      >
        <div className="space-y-5 sm:px-0 px-16">
          <p className="text-white font-bold text-5xl flex flex-col items-center">
            <span>
              Unlimited movies, TV <br />
            </span>
            <span> shows and more. </span>
          </p>
          <p className="text-white font-semibold text-3xl flex flex-col items-center">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-white text-lg flex flex-col items-center">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 border-2 border-white text-white placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-300 w-3/4"
            />
            <button className="py-2 sm:py-5 px-4 text-l font-semibold bg-red-600 hover:bg-red-700 text-white">
              Get Started &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
