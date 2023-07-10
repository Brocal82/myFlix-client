import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: 'Inception',
      Genre: 'Science Fiction',
      Description: 'A mind-bending heist thrillers set within the architecture of dreams.',
      Director: 'Christopher Nolan',
      ImageUrl: 'inception.jpg',
    },
    {
      id: 2,
      Title: 'The Dark Knight',
      Genre: 'Action',
      Description: 'A gritty crime thriller featuring the iconic superhero Batman.',
      Director: 'Christopher Nolan',
      ImageUrl: 'darkknight.jpg',
    },
    {
      id:3,
      Title: 'Interstellar',
      Genre: 'Science Fiction',
      Description: 'An epic space exploration journey to save humanity from a dying Earth.',
      Director: 'Christopher Nolan',
      ImageUrl: 'interstellar.jpg',
    },
    {
      id:4,
      Title: 'Top Gun',
      Genre: 'Action',
      Description: 'A mind-bending heist thrillers set within the architecture of dreams.',
      Director: 'Tony Scott',
      ImageUrl: 'topgun.jpg',
    }

  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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