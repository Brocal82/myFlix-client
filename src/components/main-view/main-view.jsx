import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://my-flix-app1982-c9c41fd3e5b8.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            _id: doc._id,
            Title: doc.Title,
            Genre: {
              Name: doc.Genre.Name,
              Description: doc.Genre.Description,
            },
            Director: {
              Name: doc.Director.Name,
              Bio: doc.Director.Bio,
              BirthYear: doc.Director.BirthYear,
              DeathYear: doc.Director.DeathYear,
            },
            Actors: doc.Actors,
            ImageUrl: doc.ImageUrl,
            Featured: doc.Featured,
          };
        });
        setMovies(moviesFromApi);
      })

      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <hr />
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={5}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col  className="mb-5" key={movie._id} md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
      
      {user && (                        // logout button just appear when user logIn
      <button
        className="logout-button"
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    )}
    </Row>
  );
};
      
