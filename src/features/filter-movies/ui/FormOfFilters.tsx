//TODO fix styles for range

import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useGetFiltersQuery } from "../api/dictionaryApi"
import { ROUTES } from "@/shared/config"
import { Select } from "@/shared/ui/select"
import { buildFilterParams, parseFilterParams } from "../lib/filterParams"
import YearRange from "./YearRange"
import style from "./FormOfFilters.module.scss"

const MIN_YEAR = 1998

interface IProps {
  /** Вызывается по клику на Submit (навбар так закрывает панель) */
  onSubmitClick?: () => void
}

const FormOfFilters = ({ onSubmitClick }: IProps) => {
  const { data } = useGetFiltersQuery()
  const genres = data?.genres ?? []
  const countries = data?.countries ?? []
  const { genresWrap, countriesWrap, form, orderWrap, typeWrap, yearRangeWrap, submitButton } =
    style
  const navigate = useNavigate()

  // Начальные значения берём из URL, чтобы форма совпадала с открытым фильтром
  const [searchParams] = useSearchParams()
  const [initial] = useState(() => parseFilterParams(searchParams))

  const [yearFrom, setYearFrom] = useState(initial.yearFrom ?? MIN_YEAR)
  const [yearTo, setYearTo] = useState(initial.yearTo ?? getCurrentYear())
  const [selectedGenre, setSelectedGenre] = useState(initial.genre?.toString() ?? "")
  const [selectedCountry, setSelectedCountry] = useState(initial.country?.toString() ?? "")
  const [selectedOrder, setSelectedOrder] = useState(initial.order ?? "RATING")
  const [selectedType, setSelectedType] = useState(initial.type ?? "ALL")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = buildFilterParams({
      yearFrom,
      yearTo,
      genre: selectedGenre ? Number(selectedGenre) : undefined,
      country: selectedCountry ? Number(selectedCountry) : undefined,
      order: selectedOrder,
      type: selectedType,
    })
    navigate(`${ROUTES.discover}?${params}`)
  }

  return (
    <form className={form} onSubmit={handleSubmit}>
      <div className={genresWrap}>
        <Select
          label="Select genre"
          name="genres"
          placeholder="Any"
          options={genres.slice(0, 20).map((genre) => ({
            value: genre.id,
            label: genre.genre,
          }))}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        />
      </div>
      <div className={countriesWrap}>
        <Select
          label="Select country"
          name="countries"
          placeholder="Any"
          options={countries.slice(0, 20).map((country) => ({
            value: country.id,
            label: country.country,
          }))}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        />
      </div>
      <div className={orderWrap}>
        <Select
          label="Order by:"
          name="order"
          options={[
            { value: "RATING", label: "Rating" },
            { value: "NUM_VOTE", label: "Votes" },
            { value: "YEAR", label: "Year" },
          ]}
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.target.value)}
        />
      </div>
      <div className={typeWrap}>
        <Select
          label="Type"
          name="type"
          options={[
            { value: "ALL", label: "All" },
            { value: "TV_SHOW", label: "TV-Shows" },
            { value: "TV_SERIES", label: "TV-Series" },
            { value: "MINI_SERIES", label: "Mini-Series" },
            { value: "FILM", label: "Films" },
          ]}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        />
      </div>
      <div className={yearRangeWrap}>
        <YearRange
          yearFrom={yearFrom}
          setYearFrom={setYearFrom}
          yearTo={yearTo}
          setYearTo={setYearTo}
        />
      </div>
      <button className={submitButton} type="submit" onClick={onSubmitClick}>
        Submit
      </button>
    </form>
  )
}

export default FormOfFilters

function getCurrentYear() {
  return new Date().getFullYear()
}
