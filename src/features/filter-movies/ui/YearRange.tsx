import style from "./FormOfFilters.module.scss"

export const MIN_YEAR = 1950
const currentYear = () => new Date().getFullYear()

interface IYearRangeProps {
  yearFrom: number
  setYearFrom: (value: number) => void
  yearTo: number
  setYearTo: (value: number) => void
}

const YearRange = ({ yearFrom, setYearFrom, yearTo, setYearTo }: IYearRangeProps) => {
  const max = currentYear()
  return (
    <fieldset className={style.years}>
      <legend>Годы выпуска</legend>
      <label>
        <span>
          С <b>{yearFrom}</b>
        </span>
        <input
          type="range"
          min={MIN_YEAR}
          max={max}
          value={yearFrom}
          onChange={(e) => setYearFrom(parseInt(e.target.value, 10))}
        />
      </label>
      <label>
        <span>
          По <b>{yearTo}</b>
        </span>
        <input
          type="range"
          min={MIN_YEAR}
          max={max}
          value={yearTo}
          onChange={(e) => setYearTo(parseInt(e.target.value, 10))}
        />
      </label>
    </fieldset>
  )
}

export default YearRange
