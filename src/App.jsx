import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorMessage from './assets/components/ErrorMessage'
import LocationFilter from './assets/components/LocationFilter'
import LocationInf from './assets/components/LocationInf'
import ResidentList from './assets/components/ResidentList'
import getRandom from './utils/getRandom'

const RESIDENT_BY_PAGE = 15

function App() {
  const [location, setLocation] = useState()
  const [locationName, setLocationName] = useState("")
  const [showError, setShowError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [residentsFilters, setResidentsFilters] = useState([])

  const getData = (idDimension) => {
    if (idDimension) {
      const URL = `https://rickandmortyapi.com/api/location/${idDimension}`
      axios.get(URL)
        .then(res => setLocation(res.data))
        .catch(err => {
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
          }, 2000)
          console.log(err)
        })
    } else {
      alert("Enter a value")
    }
  }

  useEffect(() => {
    const randomDimension = getRandom()
    getData(randomDimension)
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    const disemsionSearch = e.target.searchValue.value
    getData(disemsionSearch)
  }

  const handleChangeInput = (e) => {
    setLocationName(e.target.value)
  }

  const getNewLocation = (URL, name) => {
    setLocationName(name)
    axios.get(URL)
      .then(res => setLocation(res.data))
      .catch(err => console.log(err))
  }

  const getAllPages = () => {
    const arrayPages = []
    for (let i = 1; i <= lastPage; i++) {
      arrayPages.push(i)
    }
    return arrayPages
  }

  getAllPages()

  useEffect(() => {
    if (location) {
      const quantyResidents = location.residents.length
      const quantyPage = Math.ceil(quantyResidents / RESIDENT_BY_PAGE)
      setLastPage(quantyPage)
      setCurrentPage(1)
    }

  }, [location])

  useEffect(() => {
    const lastResidentCut = currentPage * RESIDENT_BY_PAGE
    const firstResidentCut = lastResidentCut - RESIDENT_BY_PAGE
    const newResidentFilter = location?.residents.slice(firstResidentCut, lastResidentCut)
    setResidentsFilters(newResidentFilter)
  }, [currentPage, location])
  


  return (
    <div className="App">
      <img className='header__image' src="https://p4.wallpaperbetter.com/wallpaper/410/59/609/rick-and-morty-tv-rick-sanchez-morty-smith-wallpaper-preview.jpg" alt="" />
      <h1 className='header__title'>Rick and Morty</h1>
      <form  className='header__form' onSubmit={handleSubmit}>
        <input className='header__input' id='searchValue' value={locationName} type="text" onChange={handleChangeInput} placeholder='Search your dimension' />
        <button className='header__btn'  type='submit'>Search</button>
        {
          showError ? <ErrorMessage /> : ""
        }
      </form>
      <LocationFilter locationName={locationName} getNewLocation={getNewLocation} />
      <LocationInf location={location} />
      <ResidentList residentsFilters={residentsFilters} />
      <ul className='list__page'>
        {
          getAllPages().map(page => (
            <li 
            className={currentPage === page ? "currentPage" : "" }
            onClick={() => setCurrentPage(page)} 
            key={page}>{page}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
