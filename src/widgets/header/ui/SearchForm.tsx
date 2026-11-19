import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ROUTES } from "@/shared/config"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import style from "./SearchForm.module.scss"

const SearchForm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [inputKeyword, setInputKeyword] = useState(() => searchParams.get("q") ?? "")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = inputKeyword.trim()
    if (!q) return
    navigate(`${ROUTES.search}?${new URLSearchParams({ q })}`)
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Input
        name="search"
        placeholder="Search"
        type="search"
        value={inputKeyword}
        onChange={(e) => setInputKeyword(e.target.value)}
      />
      <Button text="Search" type="submit" />
    </form>
  )
}

export default SearchForm
