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
  title: string | undefined;
}
export interface IMovie {
  countries?: { country: string }[];
  coverUrl?: string;
  description?: string;
  genres?: { genre: string }[];
  imdbId?: string;
  kinopoiskId: number;
  logoUrl?: string;
  nameEn?: string;
  nameOriginal?: string;
  nameRu?: string;
  posterUrl?: string;
  posterUrlPreview?: string;
  ratingAgeLimits?: string;
  ratingImdb?: number;
  ratingKinopoisk?: number;
  type?: string;
  year?: number;
}

export interface ISliderState {
  sliderContent: IMovie[];
  totalItems: number;
  selectedMovie: IMovie | null;
  loading: boolean;
  error: string | null;
}

export interface IObjectFrommainPage {
  limit?: number;
  page?: number;
  searchQuery?: string;
  ordering?: string;
  type?: string;
}
export interface IMoviesState {
  movies: IMovie[];
  loading: boolean;
  error: string | null;
  selectedMovie: IMovie | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  ordering: string;
  selectedImage: string | null;
}
