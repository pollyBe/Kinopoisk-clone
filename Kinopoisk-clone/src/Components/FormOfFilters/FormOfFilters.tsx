//TODO fix styles for range

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import style from './FormOfFilters.module.scss';
import { GetFilters } from '../../store/filtersSlice';
import YearRange from '../YearRange/YearRange';
import Select from '../../UI-Components/Select/Select';
import { switchIsActive } from '../../store/isActiveSlice';

const FormOfFilters = () => {
  const { isActive } = useSelector((state:RootState) => state.isActive)
  const { genres, countries } = useSelector((state: RootState) => state.filters);
  const { genresWrap, countriesWrap, form, orderWrap, typeWrap, yearRangeWrap, submitButton } = style;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [yearFrom, setYearFrom] = useState(1998);
  const [yearTo, setYearTo] = useState(getCurrentYear());
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    dispatch(GetFilters());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterData = {
      yearFrom,
      yearTo,
      genre: parseInt(selectedGenre),
      country: parseInt(selectedCountry),
      order: selectedOrder,
      type: selectedType,
    };
    navigate('/custom-filter', { state: filterData });
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
      <div className={orderWrap}>
      <Select
        label="Order by:"
        name="order"
        options={[
          { value: 'RATING', label: 'Rating' },
          { value: 'NUM_VOTE', label: 'Votes' },
          { value: 'YEAR', label: 'Year' },
        ]}
        value={selectedOrder}
        onChange={(e) => setSelectedOrder(e.target.value)}
        /></div>
      <div className={typeWrap}>
      <Select
        label="Type"
        name="type"
        options={[
          { value: 'ALL', label: 'All' },
          { value: 'TV_SHOW', label: 'TV-Shows' },
          { value: 'TV_SERIES', label: 'TV-Series' },
          { value: 'MINI_SERIES', label: 'Mini-Series' },
          { value: 'FILM', label: 'Films' },
        ]}
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        /></div>
      <div className={yearRangeWrap}>
      <YearRange
        yearFrom={yearFrom}
        setYearFrom={setYearFrom}
        yearTo={yearTo}
        setYearTo={setYearTo}
      /></div>
      <button className={submitButton} type="submit" onClick={() => dispatch(switchIsActive(isActive ? false : true))}>Submit</button>
    </form>
  );
};

export default FormOfFilters;

function getCurrentYear() {
  return new Date().getFullYear();
}
