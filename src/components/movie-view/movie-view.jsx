import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="color-container">
      <div>
        <img src={movie.ImageUrl} className="w-100"/>
      </div>
      <div>
          <span><strong>Title: </strong></span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <div>
            <span><strong>Genre: </strong></span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div>
            <span><strong>Description: </strong></span>
            <span>{movie.Genre.Description}</span>
          </div>
        </div>
        <div>
          <div>
            <span><strong>Director: </strong></span>
            <span>{movie.Director.Name}</span>
          </div>
          <div>
            <span><strong>Bio: </strong></span>
            <span>{movie.Director.Bio}</span>
          </div>
          <div>
            <span><strong>BirthYear: </strong></span>
            <span>{movie.Director.BirthYear}</span>
          </div>
          <div>
            <span><strong>DeathYear: </strong></span>
            <span>{movie.Director.DeathYear}</span>
          </div>
        </div>
      
      
      
      <button 
      onClick={onBackClick} 
      className="back-button"
      style={{ cursor: "pointer"}} >Back</button>
    </div>
  );
};