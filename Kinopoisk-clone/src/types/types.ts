export interface IButtonProps {
  text: string;
  type: "button" | "submit";
  onClick?: () => void;
}
export interface IInputProps {
  label?: string;
  type: "search" | "text" | "password";
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface ITitleProps {
  title: string;
}
export interface IMovieProps {
  countries: { name: string }[];
  coverUrl: string;
  description: string;
  genres: { name: string }[];
  imdbId: string;
  kinopoiskId: number;
  logoUrl: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingAgeLimits: string | null;
  ratingImdb: number | null;
  ratingKinopoisk: number | null;
  type: string;
  year: number;
}
