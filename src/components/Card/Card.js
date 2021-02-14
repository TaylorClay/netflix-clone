import {useState} from 'react';

import IconSearch from "../../icons/IconSearch";
import {_trimTextLength} from "../../common/Utilities";

import './Card.css';

function Card({
  id,
  title,
  overview,
  posterPath,
  myListBtnContent,
  myListHandler,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const onMouseOverHandler = () => setIsHovered(true);
  const onMouseLeaveHandler = () => setIsHovered(false);

  const onLoadHandler = () => setImageLoaded(true);
  const onErrorHandler = () => setImageLoaded(false);

  const flipCard = (e) => {
    // Front card face
    e.target.firstElementChild.classList.toggle('Face-hidden')
    // Back card face
    e.target.lastElementChild.classList.toggle('Face-hidden')
    // Card face container
    e.target.classList.toggle('Flipped')
  }

  // Opens a Google search with a query to find where to watch the title
  const openSearch = (title) => {
    return (e) => {
      // Prevent this handler from bubbling up and breaking the flip card handler
      e.stopPropagation();

      window.open(`https://www.google.com/search?q=where+to+watch+${title.toLowerCase().split(' ').join('+')}`, '_blank')
    }
  }

  return (
    <li
      className="Card"
      onMouseOver={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div
        className="Card-inner"
        onClick={flipCard}
      >
        <div className="Card-front">
          {!imageLoaded && (
            <div className="Card-title" title={title}>
              {_trimTextLength(title)}
            </div>
          )}
          <img
            className="Card-backdrop-image"
            src={`https://image.tmdb.org/t/p/w342${posterPath}`}
            alt="" // Decorative image, do not provide alt
            loading="lazy"
            width="100%"
            height="100%"
            onLoad={onLoadHandler}
            onError={onErrorHandler}
          />
          {isHovered && (
            <div className="Card-overlay">
              <button
                className="Card-overlay-btn"
                onClick={myListHandler({
                  id,
                  title,
                  overview,
                  posterPath,
                })}
              >
                {myListBtnContent}
              </button>
            </div>
          )}
        </div>
        <div className="Card-back Face-hidden">
          <div className="Card-overview" title={overview}>
            {_trimTextLength(overview, 300)}
          </div>
          <div className="Card-overlay">
            <button
              className="Card-overlay-btn Card-overlay-btn-padding"
              onClick={openSearch(title)}
            >
              <IconSearch />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
