import React, { useEffect, useState } from 'react';
import '../Styles/Favourites.css';
function Favorites({favorites, toggle }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Retrieve favorite movies from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies'));
    if (storedFavorites) {
      setFavoriteMovies(storedFavorites);
    }
  }, []);

  const removeFavorite = (movieId) => {
    // Remove movie from favorites
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);
    // Update local storage
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  };

  return (
<div>
      <h2>Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        favoriteMovies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            {/* Display other movie details */}
            <button onClick={() => removeFavorite(movie.id)}>Remove Favorite</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
