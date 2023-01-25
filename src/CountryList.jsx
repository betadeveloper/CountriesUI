import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CountryList.scss'

export default function CountryList() {
  const [countries, setCountries] = useState([])
  const [originalCountries, setOriginalCountries] = useState([])
  const [sortOrder, setSortOrder] = useState('asc')
  const [areaFilter, setAreaFilter] = useState(false)
  const [regionFilter, setRegionFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all?fields=name,region,area')
      .then((res) => {
        setOriginalCountries(res.data)
        setCountries(res.data)
      })
  }, [])

  useEffect(() => {
    let filteredCountries = [...originalCountries]

    if (areaFilter) {
      filteredCountries = filteredCountries.filter(
        (country) => country.area < 65200
      )
    }

    if (regionFilter) {
      filteredCountries = filteredCountries.filter(
        (country) => country.region === regionFilter
      )
    }

    filteredCountries.sort((a, b) => {
      if (sortOrder === 'ascending') {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })

    setCountries(filteredCountries)
  }, [sortOrder, areaFilter, regionFilter, originalCountries])

  return (
    <div className='CountryList'>
      <h1>Countries By Area</h1>

      <div className='filterButtons'>
        <button onClick={() => setSortOrder('ascending')}>Ascending</button>
        <button onClick={() => setSortOrder('descending')}>Descending</button>
        <button
          onClick={() => setAreaFilter(!areaFilter)}
          className={areaFilter ? 'selected' : undefined}
        >
          Smaller Than Lithuania
        </button>
      </div>

      <div>
        <label>
          Filter by region:
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value=''>All</option>
            <option value='Asia'>Asia</option>
            <option value='Africa'>Africa</option>
            <option value='Americas'>Americas</option>
            <option value='Europe'>Europe</option>
            <option value='Oceania'>Oceania</option>
          </select>
        </label>
      </div>

      <ul>
        {countries.map((country) => (
          <div key={country.name}>
            <li>{country.name}</li>
            <li>{country.region}</li>
            <li>{country.area} km²</li>
            <br />
          </div>
        ))}
      </ul>
    </div>
  )
}
