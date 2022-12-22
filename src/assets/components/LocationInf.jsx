import React from 'react'

const LocationInf = ({location}) => {
 
  return (
    <article className='location__inf'>
        <h2 className='location__name'>{location?.name}</h2>
        <ul className='location__character'>
          <li><span>Type: </span>{location?.type}</li>
          <li><span>Dimension: </span>{location?.dimension}</li>
          <li><span>Population: </span>{location?.residents.length}</li>
        </ul>
    </article>
  )
}

export default LocationInf