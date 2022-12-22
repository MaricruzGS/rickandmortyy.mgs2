import React from 'react'
import ResidentCard from './ResidentCard'

const ResidentList = ({residentsFilters}) => {
  return (
    <section className='resident__list'>
    {
      residentsFilters?.map(urlResident => (
        <ResidentCard key={urlResident} urlResident={urlResident}/>
      ) )
    }
  </section>
  )
}

export default ResidentList