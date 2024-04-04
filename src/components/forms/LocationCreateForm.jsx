// only import what you want to use
import {
    Button,
    Label,
    TextInput,
  } from "flowbite-react";
export default function LocationCreateForm() {
  return (
    <form className="flex max-w-md flex-col gap-4">
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
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="sno" value="Phone number" />
        </div>
        <TextInput
          id="sno"
          type="tel"
          placeholder="input phone number"
          required
        />
      </div>


      
      

      <Button type="submit">Submit</Button>
    </form>
  )
}
