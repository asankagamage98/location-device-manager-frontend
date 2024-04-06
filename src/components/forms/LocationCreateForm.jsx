import React, { useState } from "react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function LocationCreateForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //import environment variables
  const LOCATION = import.meta.env.VITE_LOCATION_API_URL;

  //submit location
  const submit = (e) => {
    e.preventDefault();
    try {
      axios.post(`${LOCATION}`, form);
      // success toast
      Swal.fire({
        icon: "success",
        title: "Location created Successfully",
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        toast: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      navigate("/viewLocations");
    } catch (error) {
      // error toast
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create location. Please try again later.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      console.error("Error creating location:", error.message);
    }
  };

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={submit}>
      <div className="font-bold text-2xl">
        <p className="">Add a new Location</p>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="sno" value="Human readable name" />
        </div>
        <TextInput
          id="sno"
          type="text"
          placeholder="Input human readable namer"
          name="name"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="sno" value="Address" />
        </div>
        <TextInput
          id="sno"
          type="text"
          placeholder="Input Address"
          name="address"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="sno" value="Phone number" />
        </div>
        <TextInput
          id="sno"
          type="number"
          placeholder="Input phone number(0-9)"
          name="phone"
          onChange={handleChange}
          pattern="[0-9]*"
          maxLength="10"
          required
        />
      </div>
      <Button color="blue" type="submit">
        Submit
      </Button>
    </form>
  );
}
