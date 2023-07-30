import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
  return (
    <Link
      className="text-decoration-none"
      to={`/movies/${encodeURIComponent(movie._id)}`}
    >
    
    <Card style={{ width: "18rem", height: "100%" }}>
      <Card.Img variant="top" src={movie.ImageUrl}/>
      <Card.Body>
        <Card.Title className="text-center white-text">{movie.Title}</Card.Title>
        <Card.Text className="text-center white-text">{movie.Genre.Name}</Card.Text>
      </Card.Body>
    </Card>
    </Link>
  );
};



MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.number.isRequired,
      DeathYear: PropTypes.number,
    }).isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    ImageUrl: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};


