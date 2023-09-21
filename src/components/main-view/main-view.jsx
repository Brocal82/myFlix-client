import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { SearchBar } from "../search-bar/search-bar"; // Import the SearchBar component

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]); // State to hold the filtered movies

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (!token) return;

    fetch("https://flixapirender.onrender.com/movies", {
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

  // Define the onBackClick function in the MainView component
  const handleBackClick = () => {};

  // Function to update the filtered movies when the user searches
  const handleMovieSearch = (filteredMovies) => {
    setFilteredMovies(filteredMovies);
  };

  return (
    <BrowserRouter>
      <Row>
        <Col>
          <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
              window.location.reload();
            }}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col className="m-2" md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col className="m-3" md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:MovieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty</Col>
                ) : (
                  <Col md={8}>
                    {/* Pass the onBackClick function as a prop */}
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      updateUser={updateUser}
                      onBackClick={handleBackClick} // Pass the callback function as a prop
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>This list is empty!</Col>
                ) : (
                  <>
                    {/* Add the SearchBar component */}
                    <Col className="mb-4" md={12}>
                      <SearchBar
                        movies={movies}
                        handleMovieSearch={handleMovieSearch} // Pass the callback function
                      />
                    </Col>
                    {filteredMovies.length === 0 ? (
                      movies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))
                    ) : (
                      // Render the filtered movies
                      <>
                        {filteredMovies.map((movie) => (
                          <Col className="mb-4" key={movie._id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Col>
                      <ProfileView
                        user={user}
                        token={token}
                        movies={movies}
                        onLoggedOut={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                        updateUser={updateUser}
                      />
                    </Col>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
