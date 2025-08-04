import React, { useContext } from "react";
import Navbar from "./Navbar";
import { listingDataContext } from "../Context/ListingContext";
import Card from "./Card";

function Home() {
  let { listingData, setListingData } = useContext(listingDataContext);
  return (
    <div>
      <Navbar />
      <div className="w-[100vw] h-[77vh] flex items-center justify-center gap-10 mt-[250px] md:mt-[180px] pl-5 pr-5 flex-wrap">
        {listingData.map((list) => (
          <Card
            key={list._id}
            title={list.title}
            description={list.description}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            city={list.city}
            rent={list.rent}
            id={list._id}
            landmark={list.landmark}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
