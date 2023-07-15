export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImageUrl} />
      </div>
      <div>
        <span><strong>Title: </strong></span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Genre.Description}</span>
        </div>
      </div>
      
      <div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span>Bio: </span>
          <span>{movie.Director.Bio}</span>
        </div>
        <div>
          <span>BirthYear: </span>
          <span>{movie.Director.BirthYear}</span>
        </div>
        <div>
          <span>DeathYear: </span>
          <span>{movie.Director.DeathYear}</span>
        </div>
      </div>
      
      
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};