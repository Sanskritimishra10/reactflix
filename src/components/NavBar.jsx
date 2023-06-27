import React, { Fragment, useState } from 'react'
import '../Styles/NavBarStyle.css'
import {Routes,Route,NavLink} from 'react-router-dom';
import Movies from './Movies';
import TvShows from './TvShows';
import Trending from './Trending';
import Favorites from './Favorites';
export const Container=React.createContext()
function NavBar() {
    const [toggle,setToggle]=useState(true);
    const [InputValue,setInputValue]=useState('')
  return (
   <Container.Provider value={{toggle,InputValue}}>
  <Fragment>
<nav className={toggle ? '':'navBarColor'}>
    <div className='nav-options'>
<h1 id={toggle ? '':'heading'}>REACTFLIX</h1>
<NavLink to="" style={({isActive})=>{return{color:isActive?'#fff':'#EE9B00'}}}>
<span id={toggle ?'Movies':'MoviesLight'}>Movies</span>
</NavLink>
<NavLink to="/TvShows"  style={({isActive})=>{return{color:isActive?'#fff':'#EE9B00'}}}>
<span id={toggle ?'Movies':'MoviesLight'}>TvShows</span>
</NavLink>
<NavLink to="/Trending"  style={({isActive})=>{return{color:isActive?'#fff':'#EE9B00'}}}>
<span id={toggle ?'Movies':'MoviesLight'}>Trending</span>
</NavLink>
<NavLink to="/Favorites"  style={({isActive})=>{return{color:isActive?'#fff':'#EE9B00'}}}>
<span id={toggle ?'Movies':'MoviesLight'}>Favourites</span>
</NavLink>
    </div>
    <div className="input-group">
    <input type="text" placeholder='Search whatever you want' onChange={(e)=> setInputValue(e.target.value)} />
<div id="Color-switcher" onClick={()=>setToggle(!toggle)}>
    <div id={toggle ?'Color-switcher-mover':'Color-switcher-moved'}>
    </div>
    </div>   
</div>

</nav>

<Routes>
<Route path='' element={<Movies/>}/>
<Route path='TvShows' element={<TvShows/>}/>
<Route path='Trending' element={<Trending/>}/>
<Route path='Favorites' element={<Favorites/>}/>
</Routes>
  </Fragment>
  </Container.Provider>
  )
}

export default NavBar