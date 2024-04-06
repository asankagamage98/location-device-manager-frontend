import {
  Button,
  FileInput,
  Label,
  Radio,
  Select,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeviceEditForm() {
  const [form, setForm] = useState({
    serialNumber: "",
    type: "",
    image: "",
    locationId: "",
    status: "active",
  });

  const [locations, setLocations] = useState([]);
  const [image, setImage] = useState("");

  // import environment variables
  const DEVICE = import.meta.env.VITE_DEVICE_API_URL;
  const LOCATION = import.meta.env.VITE_LOCATION_API_URL;

  // Get the device ID from the URL params
  const { id } = useParams();
  // initialize navigate
  const navigate = useNavigate();

  // fetch all locations
  const fetchAllLocations = () => {
    axios
      .get(`${LOCATION}`)
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get device details by id
  const fetchSingleDevice = () => {
    axios
      .get(`${DEVICE}${id}`)
      .then((response) => {
        let { device, location } = response.data;
        setForm({
          serialNumber: device?.serialNumber,
          type: device?.type,
          image: device?.image,
          locationId: location?._id,
          status: device?.status,
        });
        setImage(device?.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //submit form data
  const Submit = (e) => {
    e.preventDefault();
    axios
      .put(`${DEVICE}${id}`, form)
      .then((response) => {
        console.log(response);
        alert("successfully updated data ...!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Convert image file to  string
  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const maxSize = 15 * 1024 * 1024; // 15MB in bytes
    const acceptedImageTypes = ["image/jpeg", "image/png"];

    if (file && file.size <= maxSize) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const fileType = file.type;
        if (acceptedImageTypes.includes(fileType)) {
          setForm({ ...form, image: reader.result });
          setImage(reader.result);
        } else {
          alert("Please select an image file (JPEG, PNG) only.");
          e.target.value = null;
        }
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    } else {
      alert("Please select a file below 15MB.");
      e.target.value = null;
    }
  };

  // fetch locations and device details
  useEffect(() => {
    fetchAllLocations();
    fetchSingleDevice();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-3">
      <form className="flex max-w-md flex-col gap-4" onSubmit={Submit}>
        <div className="font-bold text-2xl">
          <p className="">Edit device information</p>
        </div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="type" value="Select Device Type" />
          </div>
          <Select
            className="capitalize"
            id="type"
            name="type"
            onChange={handleChange}
            value={form?.type}
            required
          >
            <option value="" disabled selected hidden>
              Choose Device Type
            </option>
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="sno" value="Serial number" />
          </div>
          <TextInput
            id="sno"
            type="text"
            name="serialNumber"
            value={form?.serialNumber}
            placeholder="Input Serial number"
            onChange={handleChange}
            required
          />
        </div>

        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="location" value="Select Location" />
          </div>
          <Select
            className="capitalize"
            id="location"
            value={form.locationId}
            name="locationId"
            onChange={handleChange}
            required
          >
            <option value="" disabled selected hidden>
              Choose Location
            </option>
            {locations?.map((value, index) => (
              <option className="capitalize" key={index} value={value?._id}>
                {value?.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG
              </p>
              {image == "" || image == null ? (
                ""
              ) : (
                <img src={image} width={100} height={100} />
              )}
            </div>
            <FileInput
              id="dropzone-file"
              className="hidden"
              name="image"
              //   value={form?.image || null}
              onChange={convertToBase64}
            />
          </Label>
        </div>

        <fieldset className="flex max-w-md flex-row gap-4">
          <legend className="mb-4">Status</legend>
          <div className="flex items-center gap-2">
            <Radio
              id="active"
              name="status"
              value="active"
              checked={form.status === "active"}
              onChange={handleChange}
            />
            <Label htmlFor="active">Active</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="inactive"
              name="status"
              value="inactive"
              checked={form.status === "inactive"}
              onChange={handleChange}
            />
            <Label htmlFor="inactive">Inactive</Label>
          </div>
        </fieldset>

        <Button color="blue" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
}
