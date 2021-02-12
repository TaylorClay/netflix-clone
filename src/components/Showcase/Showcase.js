import {useEffect, useState} from 'react';

import {_getIsIdInList, _trimWordLength} from "../../common/Utilities";

import './Showcase.css';

function ShowCase({ title, slug, myList, myListAddHandler, myListRemoveHandler }) {
  const [showCaseMovie, setShowCaseMovie] = useState({});
  const [imageLoaded, setImageLoaded] = useState(true);

  // Fetches a list of movies to be used in the Showcase
  useEffect(() => {
    const API_KEY = '018ed007af059457fbde52398c825e19'; // TODO: Remove
    let timeoutId;
    (async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/${slug}?api_key=${API_KEY}`);
        const data = await res.json();

        // Keep a list of viable movies to choose from, so we can rotate through them
        const movies = [];
        data.results.forEach(movie => {
          if (movie.backdrop_path) { // Only care about movies with a background image
            movies.push(movie);
          }
        })

        // Rotate at random to keep the showcase interesting
        if (movies.length> 0) {
          const randIndex = Math.floor(Math.random() * Math.floor(movies.length))
          setShowCaseMovie(movies[randIndex]);


          const TIMEOUT = 30_000;
          const changeShowcase = () => {
            const randIndex = Math.floor(Math.random() * Math.floor(movies.length))
            setShowCaseMovie(movies[randIndex]);
            timeoutId = setTimeout(changeShowcase, TIMEOUT);
          }
          timeoutId = setTimeout(changeShowcase, TIMEOUT);
        }
      } catch (e) {
        console.error(`Error fetching ${title} for the Showcase\n`, e);
      }
    })();

    return () => clearTimeout(timeoutId);
  }, []);

  // Opens YouTube with a query to find the target movie's trailer
  const openTrailer = (movieTitle) => {
    return () => window.open(`https://www.youtube.com/results?search_query=${movieTitle.toLowerCase().split(' ').join('+')}+movie+trailer`, '_blank')
  }

  const onLoadHandler = () => setImageLoaded(true);
  const onErrorHandler = () => setImageLoaded(false);

  const { id, backdrop_path, title: movieTitle, overview } = showCaseMovie;

  const isInMyList = _getIsIdInList(myList, id);
  const _myListHandler = isInMyList ? myListRemoveHandler : myListAddHandler;

  return (
    <header id="Showcase-wrapper">
      {showCaseMovie.id && (
        <div id="Showcase-content-wrapper">
          {imageLoaded && <img
            id="Showcase-backdrop-image"
            loading="eager"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="" // Decorative image, do not provide alt
            width="100%"
            height="100%"
            onLoad={onLoadHandler}
            onError={onErrorHandler}
          />}
          <div id="Showcase-overlay">
            <h1 title={movieTitle}>
              {movieTitle}
            </h1>
            <p title={overview}>
              {_trimWordLength(overview, document.body.clientWidth / 20)}
            </p>
            <div id="Showcase-button-group">
              <button
                className="Showcase-button"
                onClick={openTrailer(movieTitle)}>
                Trailer
              </button>
              <button
                className="Showcase-button"
                onClick={_myListHandler({...showCaseMovie, myListAddHandler, myListRemoveHandler})}
              >
                {`${isInMyList ? '-' : '+'} My List`}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default ShowCase;