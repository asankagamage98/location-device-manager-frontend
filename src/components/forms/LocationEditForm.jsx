import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LocationEditForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //import environment variables
  const LOCATION = import.meta.env.VITE_LOCATION_API_URL;

  // get single location by id
  const getSingleLoationData = () => {
    axios
      .get(`${LOCATION}${id}`)
      .then((res) => {
        console.log(res.data);
        setForm(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // submit update details
  const submit = (e) => {
    e.preventDefault();
    try {
      axios.put(`${LOCATION}${id}`, form);
      // success toast
      Swal.fire({
        icon: "success",
        title: "Location updated Successfully",
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
        text: "Failed to update location. Please try again later.",
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

      console.error("Error updating location:", error.message);
    }
  };

  useEffect(() => {
    getSingleLoationData();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-3 m-0">
      <form className="flex max-w-md flex-col gap-4" onSubmit={submit}>
        <div className="font-bold text-2xl">
          <p className="">Edit Location</p>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="sno" value="Human readable name" />
          </div>
          <TextInput
            id="sno"
            type="text"
            placeholder="input human readable namer"
            name="name"
            value={form?.name}
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
            placeholder="input Address"
            name="address"
            value={form?.address}
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
            placeholder="input phone number"
            name="phone"
            value={form?.phone}
            onChange={handleChange}
            pattern="[0-9]*"
            maxLength="10"
            required
          />
        </div>
        <Button color="blue" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
}
