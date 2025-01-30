import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import style from './FormOfFilters.module.scss';
import { useEffect, useState } from 'react';
import { GetFilters } from '../../store/filtersSlice';
import YearRange from '../YearRange/YearRange';
import Select from '../../UI-Components/Select/Select';

const FormOfFilters = () => {
  const { genres, countries } = useSelector((state: RootState) => state.filters);
  const { genresWrap, countriesWrap, form } = style;
  const dispatch = useDispatch<AppDispatch>();

  const [yearFrom, setYearFrom] = useState(1998);
  const [yearTo, setYearTo] = useState(getCurrentYear());
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    dispatch(GetFilters());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      yearFrom,
      yearTo,
      genre: parseInt(selectedGenre),
      country: parseInt(selectedCountry),
    };
    console.log(formData);
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <div className={genresWrap}>
        <Select
          label="Select genre"
          name="genres"
          options={genres.slice(0, 20).map((genre) => ({
            value: genre.id,
            label: genre.genre,
          }))}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        />
      </div>
      <div className={countriesWrap}>
        <Select
          label="Select country"
          name="countries"
          options={countries.slice(0, 20).map((country) => ({
            value: country.id,
            label: country.country,
          }))}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        />
      </div>
      <YearRange
        yearFrom={yearFrom}
        setYearFrom={setYearFrom}
        yearTo={yearTo}
        setYearTo={setYearTo}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormOfFilters;

function getCurrentYear() {
  return new Date().getFullYear();
}
