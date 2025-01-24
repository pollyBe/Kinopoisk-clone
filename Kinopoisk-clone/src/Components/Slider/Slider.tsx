import { useNavigate } from 'react-router-dom';

import Left from '../../assets/icons/angles-left-solid.svg?react'
import Right from '../../assets/icons/angles-right-solid.svg?react'

import style from './Slider.module.scss'
import { useState } from 'react';

const Slider = ({ movies }) => {
  const { sliderWrap, sliderTitle, slider, slide, sliderList, icon, arrowWrap, button } = style;
  const navigate = useNavigate();

  const handlePrevClick = () => {

  };

  const handleNextClick = () => {

  };



  return (<div className={sliderWrap}>
    <div className={sliderTitle}>
      <h2>Top popular for all time</h2>
    </div>
    {/* <div className={arrowWrap}>
    <Left className={icon} /></div> */}
    <div className={slider}>
    <ul className={sliderList}>
        {movies.map((movie) => (
          <li key={movie.kinopoiskId} className={slide}>
            <img src={movie.posterUrl} alt="poster" />
          </li>
        ))}
      </ul>
    </div>
    <div className={arrowWrap}>
      <button className={button} onClick={handlePrevClick}><Left className={icon} /></button>
      <button className={button} onClick={handleNextClick}><Right className={icon}/></button>
    </div>
  </div>)
}
export default Slider