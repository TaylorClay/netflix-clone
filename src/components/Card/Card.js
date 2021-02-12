import {useState} from 'react';

import {_trimTextLength} from "../../common/Utilities";

import './Card.css';

function Card({
  id,
  title,
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

  return (
    <li
      className="Card"
      onMouseOver={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {!imageLoaded && (
        <div className="Card-title-ribbon" title={title}>
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
      {isHovered && imageLoaded && (
        <div className="Card-overlay">
          <button
            className="Card-overlay-btn"
            onClick={myListHandler({
              id,
              title,
              posterPath,
              myListBtnContent,
            })}
          >
            {myListBtnContent}
          </button>
        </div>
      )}
    </li>
  )
}

export default Card;
