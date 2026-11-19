/** Имя для показа: русское, затем английское */
export const getPersonName = (person: { nameRu?: string | null; nameEn?: string | null }) =>
  person.nameRu || person.nameEn || "Без имени"
