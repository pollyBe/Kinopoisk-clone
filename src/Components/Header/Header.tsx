import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from "../../UI-Components/Button/Button";
import Input from "../../UI-Components/Input/Input";
import Logo from "../../UI-Components/Logo/Logo";
import { FetchSearchMovies, setKeyword } from '../../store/searchSlice';
import style from './Header.module.scss';
import { AppDispatch } from '../../store';

const Header = () => {
  const { header, container, inputWrap } = style;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [inputKeyword, setInputKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setKeyword(inputKeyword));
    dispatch(FetchSearchMovies({ keyword:inputKeyword, page: 1 }));
    navigate('/search-results');
  };

  return (
    <section className={header}>
      <div className={container}>
        <div className={style.headerWrap}>
          <Logo />
          <form className={inputWrap} onSubmit={handleSubmit}>
            <Input
              name='search'
              placeholder="Search"
              type="search"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
            />
            <Button text='Search' type='submit'/>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Header;
