import type { IMovie } from "@/entities/movie/@x/person"

export interface ISpouse {
  name: string
  personId: number
}

/** Подробная информация о человеке: /api/v1/staff/:id */
export interface IPerson {
  personId: number
  webUrl: string
  nameRu: string
  nameEn: string
  sex: string
  posterUrl: string
  growth?: number
  birthday?: string
  death?: string
  age?: number
  birthplace?: string
  deathplace?: string
  spouses?: ISpouse[]
  hasAwards: number
  profession: string
  facts: string[]
  films: IMovie[]
}

/** Участник съёмочной группы фильма: /api/v1/staff?filmId= */
export interface IStaff {
  personId?: number
  staffId: number
  nameRu?: string
  nameEn?: string
  description?: string
  posterUrl: string
  professionText: string
  professionKey: string
}
