import { useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ROUTES } from "@/shared/config"
import { capitalize } from "@/shared/lib/format"
import { Select } from "@/shared/ui/select"
import { useGetFiltersQuery } from "../api/dictionaryApi"
import { buildFilterParams, parseFilterParams } from "../lib/filterParams"
import YearRange, { MIN_YEAR } from "./YearRange"
import style from "./FormOfFilters.module.scss"

const ORDER_OPTIONS = [
  { value: "RATING", label: "По рейтингу" },
  { value: "NUM_VOTE", label: "По числу голосов" },
  { value: "YEAR", label: "По году" },
]

const TYPE_OPTIONS = [
  { value: "ALL", label: "Все" },
  { value: "FILM", label: "Фильмы" },
  { value: "TV_SERIES", label: "Сериалы" },
  { value: "MINI_SERIES", label: "Мини-сериалы" },
  { value: "TV_SHOW", label: "ТВ-шоу" },
]

const byLabel = (a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label, "ru")

interface IProps {
  /** Вызывается по клику на «Показать» (навбар так закрывает панель) */
  onSubmitClick?: () => void
}

const FormOfFilters = ({ onSubmitClick }: IProps) => {
  const { data } = useGetFiltersQuery()
  const { field, form, wide, submitButton } = style
  const navigate = useNavigate()

  // В справочнике API есть пустые названия — их отбрасываем
  const genreOptions = useMemo(
    () =>
      (data?.genres ?? [])
        .filter((g) => g.genre)
        .map((g) => ({ value: g.id, label: capitalize(g.genre) }))
        .sort(byLabel),
    [data],
  )
  const countryOptions = useMemo(
    () =>
      (data?.countries ?? [])
        .filter((c) => c.country)
        .map((c) => ({ value: c.id, label: c.country }))
        .sort(byLabel),
    [data],
  )

  // Начальные значения берём из URL, чтобы форма совпадала с открытым фильтром
  const [searchParams] = useSearchParams()
  const [initial] = useState(() => parseFilterParams(searchParams))

  const [yearFrom, setYearFrom] = useState(initial.yearFrom ?? MIN_YEAR)
  const [yearTo, setYearTo] = useState(initial.yearTo ?? new Date().getFullYear())
  const [selectedGenre, setSelectedGenre] = useState(initial.genre?.toString() ?? "")
  const [selectedCountry, setSelectedCountry] = useState(initial.country?.toString() ?? "")
  const [selectedOrder, setSelectedOrder] = useState(initial.order ?? "RATING")
  const [selectedType, setSelectedType] = useState(initial.type ?? "ALL")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = buildFilterParams({
      // если «с» оказалось больше «по», меняем местами
      yearFrom: Math.min(yearFrom, yearTo),
      yearTo: Math.max(yearFrom, yearTo),
      genre: selectedGenre ? Number(selectedGenre) : undefined,
      country: selectedCountry ? Number(selectedCountry) : undefined,
      order: selectedOrder,
      type: selectedType,
    })
    navigate(`${ROUTES.discover}?${params}`)
  }

  return (
    <form className={form} onSubmit={handleSubmit} aria-label="Фильтр фильмов">
      <div className={field}>
        <Select
          label="Жанр"
          name="genres"
          placeholder="Любой"
          options={genreOptions}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        />
      </div>
      <div className={field}>
        <Select
          label="Страна"
          name="countries"
          placeholder="Любая"
          options={countryOptions}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        />
      </div>
      <div className={field}>
        <Select
          label="Сортировка"
          name="order"
          options={ORDER_OPTIONS}
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.target.value)}
        />
      </div>
      <div className={field}>
        <Select
          label="Тип"
          name="type"
          options={TYPE_OPTIONS}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        />
      </div>
      <div className={`${field} ${wide}`}>
        <YearRange
          yearFrom={yearFrom}
          setYearFrom={setYearFrom}
          yearTo={yearTo}
          setYearTo={setYearTo}
        />
      </div>
      <button className={`${submitButton} ${wide}`} type="submit" onClick={onSubmitClick}>
        Показать
      </button>
    </form>
  )
}

export default FormOfFilters
