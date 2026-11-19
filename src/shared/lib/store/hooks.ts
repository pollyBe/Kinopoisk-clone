import { useDispatch, useSelector } from "react-redux"

// RootState и AppDispatch объявлены глобально в app/store (shared не может импортировать app)
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
