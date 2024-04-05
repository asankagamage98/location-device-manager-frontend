import React,{useState,useEffect} from 'react'
import { Table } from "flowbite-react";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function LocationListTable() {
    const [location,setLocation] = useState([]);

const fetchLocationData = () => {
    axios.get('http://localhost:3001/api/location')
    .then(res =>
        setLocation(res.data)
     ).catch(err =>
        console.log(err)
     )
}

  // remove location by id
  const remove = (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/api/location/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            fetchLocationData();
          })
          .catch((err) => {
            alert("Error!");
          });
      }
    });
  };


useEffect(() => {
    fetchLocationData();
    console.log(location);
}, [])
  return (
    <>
    <div className="overflow-x-auto">
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>No</Table.HeadCell>
        <Table.HeadCell>Locatin name</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Phone number</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>

        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
       
      </Table.Head>
      <Table.Body className="divide-y">
        {location?.map((location,index) =>(
        
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
           
            <Table.Cell key={index} >{index+1}</Table.Cell>
            <Table.Cell>{location?.name}</Table.Cell>
            <Table.Cell>{location?.address}</Table.Cell>
            <Table.Cell>{location?.phone}</Table.Cell>
            <Table.Cell>
                <a href="#" className="font-medium text-green-400 hover:underline">
                Edit
                </a>
            </Table.Cell>
            <Table.Cell>
                <a href="#"  onClick={(e) => remove(e, location?._id)} className="font-medium text-red-600 hover:underline" >
                Delete
                </a>
            </Table.Cell>
            </Table.Row>
        ))}
        
      </Table.Body>
    </Table>
    </div>
    </>
  )
}
