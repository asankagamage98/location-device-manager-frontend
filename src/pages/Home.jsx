import React, { useState, useEffect } from "react";
import DeviceCard from "../components/cards/DeviceCard";
import HomeFilterForm from "../components/forms/HomeFilterForm";

import axios from "axios";
export default function Home() {
  const [locations, setLocations] = useState([]);

  const fetchAllLocations = () => {
    axios
      .get("http://localhost:3001/api/location")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllLocations();
  }, []);

  return (
    <div className="w-full  mx-auto p-3 ">
      <div className="w-full mx-auto p-3 flex justify-center">
        <HomeFilterForm locations={locations} />
      </div>

      <div className="flex flex-row space-x-4 mt-5 flex-wrap ">
        <DeviceCard locations={locations} fetch={fetchAllLocations}/>
      </div>
    </div>
  );
}
