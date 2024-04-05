import LocationListTable from "../components/tables/LocationListTable";

export default function ExistingLocations() {
  return (
    <div className=' w-full  mx-auto lg:w-3/4  '>
        <p className='text-left font-semibold text-gray-600 text-3xl m-5'>List of Locations</p>
        <LocationListTable/>
    </div>
  )
}
