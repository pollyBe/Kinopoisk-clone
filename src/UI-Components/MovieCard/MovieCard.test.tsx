
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "./MovieCard";
import { IMovie } from "../../types/types";

const mockMovie: IMovie = {
  kinopoiskId: 12345,
  filmId: 0,
  nameRu: "Тестовый фильм",
  nameOriginal: "Test Movie",
  posterUrlPreview: "test-poster.jpg",
  ratingKinopoisk: 8.5,
};

describe("MovieCard", () => {
  test("renders movie card with correct data", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByText(/8.5/)).toBeInTheDocument();

    expect(screen.getByText(/Тестовый фильм/)).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/12345");

    const img = screen.getByAltText("poster") as HTMLImageElement;
    expect(img.src).toContain("test-poster.jpg");
  });

  test("shows fallback rating when ratingKinopoisk is missing", () => {
    const movieWithoutRating: IMovie = { ...mockMovie, ratingKinopoisk: undefined };
    render(
      <MemoryRouter>
        <MovieCard movie={movieWithoutRating} />
      </MemoryRouter>
    );

    expect(screen.getByText("—")).toBeInTheDocument();
  });
});