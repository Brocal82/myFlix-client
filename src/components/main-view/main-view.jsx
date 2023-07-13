import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://my-flix-app1982-c9c41fd3e5b8.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        
        console.log(data); //provisional to find the error
    
        const moviesFromApi = data.movies.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            genre: doc.Genre.Name,
            genreDescription: doc.Genre.Description,
            director: {
              name: doc.Director.Name,
              bio: doc.Director.Bio,
              birthYear: doc.Director.BirthYear,
              deathYear: doc.Director.DeathYear,
            },
            actors: doc.Actors,
            imageUrl: doc.ImageUrl,
            featured: doc.Featured,
          };
        });
        setMovies(moviesFromApi);
      })
      
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);
  
  
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
