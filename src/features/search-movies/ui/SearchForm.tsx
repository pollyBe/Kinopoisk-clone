import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { useAppDispatch } from "@/shared/lib/store"
import { FetchSearchMovies, setKeyword } from "../model/searchSlice"
import style from "./SearchForm.module.scss"

const SearchForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [inputKeyword, setInputKeyword] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setKeyword(inputKeyword))
    dispatch(FetchSearchMovies({ keyword: inputKeyword, page: 1 }))
    navigate("/search-results")
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
