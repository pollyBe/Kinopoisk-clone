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
  countries: string[];
  genres: string[];
  imdbId: number | null;
  kinopoiskId: number;
  nameEn: string | null;
  nameOriginal: string;
  nameRu: string | null;
  posterUrl: string;
  posterUrlPreview: string;
  ratingImdb: number | null;
  ratingKinopoisk: number;
  type: string;
  year: number;
}
