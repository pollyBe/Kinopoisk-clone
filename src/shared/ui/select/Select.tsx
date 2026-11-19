export interface ISelectProps {
  label: string
  name: string
  options?: { value: string | number; label: string }[]
  /** Если задан, первым идёт пустой вариант с этой подписью (value="") */
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  value: string | number
}

const Select = ({ label, name, options, placeholder, onChange, value }: ISelectProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} onChange={onChange} value={value}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  )
}

export default Select
