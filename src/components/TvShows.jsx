import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from './NavBar'; 
import NoImg from './NoImg.jpg';
import { AiFillPlayCircle } from 'react-icons/ai';
import { AiOutlineClose} from 'react-icons/ai';
import '../Styles/Video.css'
import TrailerTvShows from '../Trailers/TrailerTvShows';
function TvShows() {
  const {toggle,InputValue}=useContext(Container)
  const input=InputValue
  const [showData,setshowData]=useState([])
  const[trailer,settrailer]=useState(true)
  const[title,settitle]=useState('')
  const Shown=input ?'search':'discover'
  const Api=`https://api.themoviedb.org/3/${Shown}/tv`
  const Images = "https://image.tmdb.org/t/p/w500";
  const TvShows=async()=>{
    const data=await axios.get(Api,{
      params:{
        api_key: 'c36b07fc649b88e2ee166bf44219e62e',
        query:input,
      }
    })
   const results= (data.data.results)
   setshowData(results)
  }
    useEffect(()=>{
      setTimeout(()=>{
        TvShows()
      },100)
    },[input]) 
    console.log(showData)
    const TvShowTitle=(shows)=>{
settitle(shows.name)
settrailer(!trailer)
    }
  return (
   <Fragment>
    <div className={toggle ? "mainBgColor":'secondaryBgColor'}>
    <div className="movies-container">
    {showData.map((shows)=>{
      return(
        <Fragment key={shows.id}>
          <div id={trailer ?'container':'NoContainer'}>
<AiFillPlayCircle color='#fff' fontSize={40} id={trailer?'playIcon':'hide' } onClick={()=>TvShowTitle(shows)}/>
<img src={shows.poster_path ? `${Images}${shows.poster_path}` : NoImg} alt="" onClick={()=>TvShowTitle(shows)}/>
<h3 id={shows.name.length>32 ? 'smaller-Text':''}className={toggle ? 'mainColor':'secondaryColor'}>{shows.name}</h3>
          </div>
        </Fragment>
      )
    })}
    {trailer? console.log:<TrailerTvShows TvShowsTitle={title} toggle={toggle}/>}
    <AiOutlineClose id={trailer?'Nothing':'Exit1'} className={toggle?'DarkTheme':'LightThemeClose'} fontSize={55} color='#fff' cursor={'pointer'} onClick={()=>settrailer(!trailer)}/>
    </div>
    </div>
   </Fragment>
  )
}
export default TvShows;