/** Ошибка RTK Query с HTTP-статусом 404 */
export const isNotFoundError = (error: unknown) =>
  typeof error === "object" && error !== null && "status" in error && error.status === 404
