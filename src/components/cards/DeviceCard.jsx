import { Card, Label } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Badge } from "flowbite-react";
import DeviceModal from "../modal/DeviceModal";

export default function DeviceCard({ locations, fetch }) {
  const [device, setDevice] = useState([]);

  useEffect(() => {
    setDevice(locations);
    console.log(device);
  }, [locations]);

  return (
    <>
      {device?.map((location, superIdx) =>
        location?.devices?.map((device, subIdx) => (
          <SingleCard
            key={`${superIdx}${subIdx}`}
            device={device}
            location={{
              name: location.name,
              address: location.address,
              phone: location.phone,
            }}
            fetch={fetch}
          />
        ))
      )}
    </>
  );
}

const SingleCard = ({ device, location, fetch }) => {
  const [openModal, setOpenModal] = useState(false);

  const getBadge = (status) =>
    status === "active" ? (
      <Badge className="w-[70px] justify-center" color="success">
        Active
      </Badge>
    ) : (
      <Badge className="w-[70px] justify-center" color="failure">
        Inactive
      </Badge>
    );

  return (
    <>
      <Card
        className="max-w-xs w-[250px] shadow-lg mb-5"
        onClick={(e) => setOpenModal(true)}
      >
        <div>
          <img src={device?.image} alt="" className="w-[200px] h-[190px]" />
        </div>
        <div>
          <h5 className="text-lg font-bold capitalize mb-2">{device?.type}</h5>
          <div className="flex flex-row space-x-2 mb-2">
            <Label>
              <p>Serial No:</p>
            </Label>
            <p className="text-sm">{device?.serialNumber}</p>
          </div>
          <div className="flex flex-row space-x-2 mb-3">
            <Label>
              <p>Location:</p>
            </Label>
            <p className="capitalize text-sm">{location?.name}</p>
          </div>

          {device?.status && getBadge(device?.status)}
        </div>
      </Card>
      {openModal && (
        <DeviceModal
          setOpenModal={setOpenModal}
          openModal={openModal}
          device={device}
          location={location}
          fetch={fetch}
          className=""
        />
      )}
    </>
  );
};
