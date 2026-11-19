import { Skeleton } from "@/shared/ui/skeleton"
import style from "./MovieCardSkeleton.module.scss"

const MovieCardSkeleton = () => (
  <Skeleton height="auto" radius="var(--radius-md)" className={style.skeleton} />
)

export default MovieCardSkeleton
