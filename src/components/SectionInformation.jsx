import React from "react";

const SectionInformation = () => {
  return (
    <div>
      <div className="h-screen flex items-center justify-center bg-black p-5">
        <div className="space-y-5 p-5">
          <p className="text-white font-bold text-4xl">Enjoy on your TV.</p>
          <p className="text-white font-semiboldbold text-xl">
            Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
            players and more.
          </p>
        </div>
        <div>
          <img
            alt="TV"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
          />
        </div>
      </div>
      <hr />
      <div className="h-screen flex items-center justify-center bg-black p-5">
        <div>
          <img
            alt=""
            className="our-story-card-img"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
            data-uia="our-story-card-img"
          />
        </div>
        <div className="space-y-5">
          <p className="text-white font-bold text-4xl">
            Download your shows to watch offline.
          </p>
          <p className="text-white font-semiboldbold text-xl">
            Save your favourites easily and always have something to watch.
          </p>
        </div>
      </div>
      <hr />
      <div className="h-screen flex items-center justify-center bg-black p-5">
        <div className="space-y-5 p-5">
          <p className="text-white font-bold text-4xl">Watch everywhere.</p>
          <p className="text-white font-semiboldbold text-xl">
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </p>
        </div>
        <div>
          <img
            alt=""
            className="our-story-card-img"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png"
            data-uia="our-story-card-img"
          />
        </div>
      </div>
      <hr />
      <div className="h-screen flex items-center justify-center bg-black p-5">
        <div className="p-5">
          <img
            alt=""
            className="our-story-card-img"
            src="https://occ-0-5556-3662.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVxdX2WnFSp49eXb1do0euaj-F8upNImjofE77XStKhf5kUHG94DPlTiGYqPeYNtiox-82NWEK0Ls3CnLe3WWClGdiJP.png?r=5cf"
            data-uia="our-story-card-img"
          />
        </div>
        <div className="space-y-5">
          <p className="text-white font-bold text-4xl">
            Create profiles for children.
          </p>
          <p className="text-white font-semiboldbold text-xl">
            Send children on adventures with their favourite characters in a
            space made just for them—free with your membership.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionInformation;
