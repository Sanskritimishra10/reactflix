import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AiFillPlayCircle,AiOutlineClose } from 'react-icons/ai';
import { Container } from './NavBar'; 
import '../Styles/Video.css'
import NoImg from './NoImg.jpg';
import TrailerMovies from '../Trailers/TrailerMovies';

function Movies() {
  const {toggle,InputValue}=useContext(Container)
  const input=InputValue
  const [moviesData, setMoviesData] = useState([]);
  const[trailer,settrailer]=useState(true)
  const[movieTitle,setMovieTitle]=useState('')
const Shown=input ?'search':'discover'
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
  const Images = "https://image.tmdb.org/t/p/w500"; // Use the correct base URL for images

  const MovieCall = async () => {
    try {
      const response = await axios.get(Api, { 
        params: {
          api_key: 'c36b07fc649b88e2ee166bf44219e62e',
          query:input,
        },
      });

      const results = response.data.results;
      setMoviesData(results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    setTimeout(()=>{ 
    MovieCall();
  },100)
  }, [input]);
const MoviesTitle=(movie)=>{
setMovieTitle(movie.title)
settrailer(!trailer)
}
  return (
    <Fragment>
    <div className={toggle ? "mainBgColor":'secondaryBgColor'}>
    <div className="movies-container">
      {moviesData.map((movie) => {
        return(
          <Fragment>
        <div id={trailer ?'container':'NoContainer'}>
        <AiFillPlayCircle color='#fff' fontSize={40} id={trailer?'playIcon':'hide' }onClick={() => MoviesTitle(movie)} />
          <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt={movie.title} onClick={()=>MoviesTitle(movie) }/>
          <h3 id={movie.title.length>32 ? 'smaller-Text':''}>{movie.title}</h3>
        </div>
        </Fragment>
        )
      })}
      {trailer? console.log:<TrailerMovies moviesTitle={movieTitle} toggle={toggle}/>}
      <AiOutlineClose id={trailer?'Nothing':'Exit1'} className={toggle?'DarkTheme':'LightThemeClose'} fontSize={55} color='#fff' cursor={'pointer'} onClick={()=>settrailer(!trailer)}/>
      </div>
      </div>
    </Fragment>
  );
}

export default Movies;
