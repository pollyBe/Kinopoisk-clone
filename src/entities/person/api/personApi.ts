import { baseApi } from "@/shared/api"
import type { IPerson, IStaff } from "../model/types"

const personApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStaffByFilm: build.query<IStaff[], number>({
      query: (filmId) => ({ url: "/v1/staff", params: { filmId } }),
    }),
    getPersonById: build.query<IPerson, number>({
      query: (id) => `/v1/staff/${id}`,
    }),
  }),
})

export const { useGetStaffByFilmQuery, useGetPersonByIdQuery } = personApi
