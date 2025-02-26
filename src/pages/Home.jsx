import React from "react";
import FaQ from "../components/FaQ";
import SectionInformation from "../components/SectionInformation";
import Banner from "../components/Banner";
import TrendingNow from "../components/TrendingNow";

const Home = () => {
  return (
    <div>
      <Banner />
      <hr />
      <TrendingNow />
      <SectionInformation />
      <hr />
      <FaQ />
      <hr />
    </div>
  );
};

export default Home;
