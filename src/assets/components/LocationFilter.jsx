import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LocationFilter = ({locationName, getNewLocation }) => {

  const [locationOptions, setLocationOptions] = useState()

  useEffect(() => {
    if (!locationName) return setLocationOptions()
   const URL = `https://rickandmortyapi.com/api/location?name=${locationName}`
   axios.get(URL)
   .then(res => setLocationOptions(res.data.results))
   .catch(err => console.log(err))
  }, [locationName])
  

  return (
    <section className='location__section--ul'>
       <ul className='location__ul'>
     {
        locationOptions?.map(
          locationOption => 
          <li className='location__li' onClick={ () => getNewLocation(locationOption.url, locationOption.name)} 
          key={locationOption.url}>{locationOption.name}</li>)
     }
    </ul>
    </section>
  )
}

export default LocationFilter