import axios from "axios";
import { Card, Label } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Badge } from "flowbite-react";

export default function DeviceCard({locations}) {
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
        
          />
        ))
      )}
    </>
  );
}

const SingleCard = ({ device, location }) => {
  const getBadge = (status) =>
    status === "active" ? (
      <Badge className='w-[70px] justify-center' color="success">Active</Badge>
    ) : (
      <Badge className='w-[70px] justify-center' color="failure">Inactive</Badge>
    );

  return (
    <Card
      className="max-w-xs w-[250px] shadow-lg mb-5"
    >
      <div>
        <img src={device?.image} alt="" srcset="" className='w-[200px] h-[190px]' />
      </div>
     <div>
        <h5 className="text-lg font-bold capitalize mb-2">{device?.type}</h5>
        <div className="flex flex-row space-x-2 mb-2">
            <Label>
            <p>Serial No:</p>
            </Label>
            <h5 className="m-0 p-0">{device?.serialNumber}</h5>
        </div>
        <div className="flex flex-row space-x-2 mb-2">
            <Label>
            <p>Location:</p>
            </Label>
            <h5 className=" capitalize">{location?.name}</h5>
        </div>

        {device?.status && getBadge(device?.status)}
     </div>
    </Card>
  );
};
