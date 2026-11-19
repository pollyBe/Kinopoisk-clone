export interface IInputProps {
  label?: string
  /** Подпись только для скринридеров (визуально скрыта) */
  hideLabel?: boolean
  type: "search" | "text" | "password"
  placeholder: string
  name: string
  value?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  label,
  hideLabel,
  className,
}: IInputProps) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className={hideLabel ? "visually-hidden" : undefined}>
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className={className}
      />
    </>
  )
}
export default Input
