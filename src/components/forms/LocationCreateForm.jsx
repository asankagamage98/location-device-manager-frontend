import React, { useState } from "react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";

export default function LocationCreateForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/location", form)
      .then((res) => {
        alert("successfully submit data..!");
      })
      .catch((err) => {
        console.log(err);
      });
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
          placeholder="input human readable namer"
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
          placeholder="input Address"
          name="address"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="sno" value="Phone numbe" />
        </div>
        <TextInput
          id="sno"
          type="number"
          placeholder="input phone number"
          name="phone"
          onChange={handleChange}
          pattern="[0-9]*"
          maxLength="10"
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
