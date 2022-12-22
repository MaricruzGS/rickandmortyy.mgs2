import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const ResidentCard = ({urlResident}) => {
    
    const [resident, setResident] = useState()

    useEffect(() => {
        axios.get(urlResident)
        .then(res => setResident(res.data))
        .catch(err => console.log(err))
    }, [])
    


  return (
    <article className='resident__card'>
        <header className='resident__header'>
            <img className='resident__img' src={resident?.image} alt="" />
            <div className='resident__status'>
                <div className={ `circle ${resident?.status}` }></div>
                <span>{resident?.status}</span>
            </div>
        </header>
        <section className='resident--card'>
            <h2 className='resident__name'>{resident?.name}</h2>
            <hr />
            <ul>
                <li><span className='card__list'>Specie: </span>{resident?.species}</li>
                <li><span className='card__list'>Origin: </span>{resident?.origin.name}</li>
                <li><span className='card__list'>Episodes where appear: </span>{resident?.episode.length}</li>
            </ul>
        </section>
    </article>
  )
}

export default ResidentCard