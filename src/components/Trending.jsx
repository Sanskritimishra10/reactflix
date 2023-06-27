import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AiOutlineClose, AiFillPlayCircle,AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import { Container } from './NavBar';
import '../Styles/Video.css';
import NoImg from './NoImg.jpg';
import TrailerTrending from '../Trailers/TrailerTrending';
import Favorites from './Favorites';

function Trending() {
  const { toggle } = useContext(Container);
  const Api = 'https://api.themoviedb.org/3';
  const Images = 'https://image.tmdb.org/t/p/w500';
  const TrendsShown = '/trending/all/week';
  const [trendArray, settrendArray] = useState([]);
  const [trailer, settrailer] = useState(true);
  const [trendTitle, settrendTitle] = useState('');
  const [favorites, setFavorites] = useState([]);
  const Trends = async () => {
    const data = await axios.get(`${Api}${TrendsShown}`, {
      params: {
        api_key: 'c36b07fc649b88e2ee166bf44219e62e',
      },
    });
    const results = data.data.results;
    settrendArray(results);
  };

  useEffect(() => {
    setTimeout(() => {
      Trends();
    }, 100);
  }, []);

  const TrendTitle = (trend) => {
    settrendTitle(trend.title);
    settrailer(!trailer);
  };
  const toggleFavorite = (movieId) => {
    const isFavorite = favorites.some((movie) => movie.id === movieId);
    if (isFavorite) {
      const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
      setFavorites(updatedFavorites);
      // Update local storage
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    } else {
      const movie = trendArray.find((movie) => movie.id === movieId);
      if (movie) {
        const updatedFavorites = [...favorites, movie];
        setFavorites(updatedFavorites);
        // Update local storage
        localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      }
    }
  };

  return (
    <Fragment>
      <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
        <div className="movies-container">
          {trendArray.map((trend) => (
            <div id={trailer ? 'container' : 'NoContainer'} key={trend.id}>
              <AiFillPlayCircle
                color="#fff"
                fontSize={40}
                id={trailer ? 'playIcon' : 'hide'}
                onClick={() => TrendTitle(trend)}
              />
              <img
                src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImg}
                alt={trend.title}
                onClick={() => TrendTitle(trend)}
              />
              <div className="movie-details">
               {favorites.some((movie) => movie.id === trend.id) ? (
                <AiFillHeart
                  className="favorite-icon"
                  fontSize={50}
                  color="#ff0000"
                  onClick={() => toggleFavorite(trend.id)}
                />
              ) : (
                <AiOutlineHeart
                  className="favorite-icon"
                  fontSize={50}
                  color="#fff"
                  onClick={() => toggleFavorite(trend.id)}
                />
              )}
              {!trailer && (
                <h3 id="smaller-Text" className={toggle ? 'mainColor' : 'secondaryColor'}>
                  {trend.name}
                </h3>
              )}
              </div>
            </div>
          ))}
          {!trailer && <TrailerTrending TrendTitle={trendTitle} toggle={toggle} />}
          <AiOutlineClose
            id={trailer ? 'Nothing' : 'Exit1'}
            className={toggle ? 'DarkTheme' : 'LightThemeClose'}
            fontSize={55}
            color="#fff"
            cursor="pointer"
            onClick={() => settrailer(true)}
          />
        </div>
        <Favorites favorites={favorites} toggle={toggle} />
      </div>
    </Fragment>
  );
}

export default Trending;
