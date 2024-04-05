import React, { useState, useEffect } from "react";
import {
  Button,
  Label,
  Select,
} from "flowbite-react";


export default function HomeFilterForm({locations}) {
   
  return (
    <>
    <form className="flex flex-row space-x-4 " action="">
        <div>
          <Select
            className="capitalize"
            id="location"
            name="locationId"
            required
          >
            {locations?.map((value, index) => (
              <option className="capitalize" key={index} value={value?._id}>
                {value?.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="max-w-lg">
          <Select className="capitalize" id="type" name="type" required>
            <option className="capitalize" value={"pos"}>
              pos
            </option>
            <option className="capitalize" value={"kiosk"}>
              kiosk
            </option>
            <option className="capitalize" value={"signage"}>
              signage
            </option>
          </Select>
        </div>
      </form>
    </>
  )
}
