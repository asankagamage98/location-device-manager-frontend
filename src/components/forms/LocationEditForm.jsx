import React, { useState ,useEffect} from "react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";

export default function LocationEditForm() {

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
      });
    
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };

      const { id } = useParams();

      const getSingleLoationData = () => {
        axios
         .get(`http://localhost:3001/api/location/${id}`)
         .then((res) => {
            console.log(res.data);
            setForm(res.data);
          })
         .catch((err) => {
            console.log(err);
          });
      }

      const submit = (e) => {
        e.preventDefault();
        axios
          .put(`http://localhost:3001/api/location/${id}`, form)
          .then((res) => {
            alert("successfully updated data..!");
          })
          .catch((err) => {
            console.log(err);
          });
      };


      useEffect(() => {
        getSingleLoationData();
      }, []);
    
      return (
        <div className='w-full max-w-md mx-auto p-3 m-0'>
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
          <Button type="submit">Update</Button>
        </form>
        </div>
      );
    }
    