export interface IInputProps {
  label?: string
  type: "search" | "text" | "password"
  placeholder: string
  name: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, placeholder, name, value, onChange, label }: IInputProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      ></input>
    </div>
  )
}
export default Input
