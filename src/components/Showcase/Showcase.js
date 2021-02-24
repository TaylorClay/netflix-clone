import {useEffect, useState} from 'react';

import {IS_MOBILE_DEVICE, _getIsIdInList, _trimWordLength} from "../../common/Utilities";
import {FETCH_STATUS} from "../../common/StateConstants";
import {useFetchCache} from "../../hooks/UseFetchCache";

import './Showcase.css';

function ShowCase({ slug, myList, myListAddHandler, myListRemoveHandler }) {
  const [showCaseMovie, setShowCaseMovie] = useState({});
  const [imageLoaded, setImageLoaded] = useState(true);

  const { status: fetchStatus, data: showcaseItems } = useFetchCache(slug);

  useEffect(() => {
    let timeoutId;

    if (fetchStatus === FETCH_STATUS.SUCCESS && showcaseItems?.length > 0) {
      // Keep a list of viable movies to choose from, so we can rotate through them
      const movies = [];
      showcaseItems.forEach(movie => {
        if (movie.backdrop_path) { // Only care about movies with a background image
          movies.push(movie);
        }
      })

      // Rotate at random to keep the showcase interesting
      if (movies.length > 0) {
        const randIndex = Math.floor(Math.random() * Math.floor(movies.length))
        setShowCaseMovie(movies[randIndex]);

        const DISPLAY_DURATION = 30_000;
        const changeShowcase = () => {
          const randIndex = Math.floor(Math.random() * Math.floor(movies.length))
          setShowCaseMovie(movies[randIndex]);
          timeoutId = setTimeout(changeShowcase, DISPLAY_DURATION);
        }
        timeoutId = setTimeout(changeShowcase, DISPLAY_DURATION);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [fetchStatus, showcaseItems]);

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
      <div id="Showcase-content-wrapper">
        {showCaseMovie.id && imageLoaded && (
          <img
            id="Showcase-backdrop-image"
            loading="eager"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="" // Decorative image, do not provide alt
            width="100%"
            height="100%"
            onLoad={onLoadHandler}
            onError={onErrorHandler}
          />
        )}
        <div id="Showcase-overlay">
          {showCaseMovie.id && (
            <>
              <h1 title={movieTitle}>
                {movieTitle}
              </h1>
              <p title={overview}>
                {_trimWordLength(overview, document.body.clientWidth / 15)}
              </p>
              <div id="Showcase-button-group">
                <button
                  className={`Showcase-button-${IS_MOBILE_DEVICE ? 'mb' : 'dt'}`}
                  onClick={openTrailer(movieTitle)}
                >
                  Trailer
                </button>
                <button
                  className={`Showcase-button-${IS_MOBILE_DEVICE ? 'mb' : 'dt'}`}
                  onClick={_myListHandler({...showCaseMovie, myListAddHandler, myListRemoveHandler})}
                >
                  {`${isInMyList ? '-' : '+'} My List`}
                </button>
              </div>
            </>
          )}
          {fetchStatus === FETCH_STATUS.LOADING && (
            <h1>
              Loading...
            </h1>
          )}
        </div>
      </div>
    </header>
  );
}

export default ShowCase;