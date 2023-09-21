import { Link, useParams } from "react-router-dom";
import { Button, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, updateUser, onBackClick }) => {
  const { MovieId } = useParams();
  const movie = movies.find((m) => m._id === MovieId);

  const [isFavoriteMovie, setAsFavorite] = useState(
    user.FavoriteMovies.includes(movie._id)
  );

  useEffect(() => {
    setAsFavorite(user.FavoriteMovies.includes(movie._id));
    window.scrollTo(0, 0);
  }, [MovieId]);

  const addFavorite = () => {
    fetch(
      `https://flixapirender.onrender.com/users/${user.Username}/movies/${MovieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully added to favorites");
          setAsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavorite = () => {
    fetch(
      `https://flixapirender.onrender.com/users/${user.Username}/movies/${MovieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert(`"${movie.Title}" Successfully deleted from favorites`);
          setAsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Col>
        <div className="color-container">
          <div>
            <img src={movie.ImageUrl} className="w-100" alt="Movie Poster" />
          </div>
          <div>
            <span>
              <strong>Title: </strong>
            </span>
            <span>{movie.Title}</span>
          </div>
          <div>
            <div>
              <span>
                <strong>Genre: </strong>
              </span>
              <span>{movie.Genre.Name}</span>
            </div>
            <div>
              <span>
                <strong>Description: </strong>
              </span>
              <span>{movie.Genre.Description}</span>
            </div>
          </div>
          <div>
            <div>
              <span>
                <strong>Director: </strong>
              </span>
              <span>{movie.Director.Name}</span>
            </div>
            <div>
              <span>
                <strong>Bio: </strong>
              </span>
              <span>{movie.Director.Bio}</span>
            </div>
            <div>
              <span>
                <strong>BirthYear: </strong>
              </span>
              <span>{movie.Director.BirthYear}</span>
            </div>
            <div>
              <span>
                <strong>DeathYear: </strong>
              </span>
              <span>{movie.Director.DeathYear}</span>
            </div>
          </div>

          <Link to={"/"}>
            <Button variant="primary"> Back </Button>
          </Link>
          {isFavoriteMovie ? (
            <Button
              variant="danger"
              className="ms-2 mt-4 mb-4"
              onClick={removeFavorite}
            >
              Remove From Favorite
            </Button>
          ) : (
            <Button
              variant="success"
              className="ms-2 mt-4 mb-4"
              onClick={addFavorite}
            >
              Add to favorite
            </Button>
          )}
        </div>
      </Col>
    </>
  );
};
