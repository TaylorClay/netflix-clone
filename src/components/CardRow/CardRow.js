import {useEffect, useMemo, useState} from 'react';

import Card from "../Card/Card";
import IconPlus from "../../icons/IconPlus";
import IconSubtract from "../../icons/IconSubtract";
import {API_KEY} from "../../common/Secrets";
import {_getIsIdInList} from "../../common/Utilities";

import './CardRow.css';

function CardRow({containerId, title, slug = null, myList, myListAddHandler, myListRemoveHandler}) {
  const [isFirstVisible, setFirstVisible] = useState(false);
  const [isLastVisible, setLastVisible] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);

  // Handles adding a fade effect on the left and right side of a row
  useEffect(() => {
    const callback = (entries) => {
      entries.forEach(entry => {
        if (!entry.target.previousElementSibling) {
          setFirstVisible(entry.isIntersecting)
        } else if (!entry.target.nextElementSibling) {
          setLastVisible(entry.isIntersecting)
        }
      });
    }
    const listEl = document.querySelector(`#${containerId}`);
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver(callback, options);

    // Observe the first card
    if (listEl?.firstElementChild) observer.observe(listEl.firstElementChild);

    // Observe the last card
    if (listEl?.lastElementChild) observer.observe(listEl.lastElementChild);

    return () => observer.disconnect();
  }, [containerId, mediaItems.length]);

  // Fetches a list of media to be used in the Row
  useEffect(() => {
    // The only CardRow without a slug should by MyList
    // We won't need to re-fetch data for MyList unless we want to support persisting data between sessions
    if (slug) {
      (async () => {
        try {
          const res = await fetch(`https://api.themoviedb.org/3/${slug}?api_key=${API_KEY}`);
          const data = await res.json();
          setMediaItems(data.results);
        } catch (e) {
          console.error(`Error fetching the ${title} Row\n`, e);
        }
      })();
    }
  }, [slug, title]);

  const isMyList = containerId === 'my-list';

  // Creates and memoizes the list of Cards to be shown in the Row
  const cards = useMemo(() => {
    const _cards = [];
    const data = isMyList ? myList : mediaItems;
    for (let i = 0; i < data.length; i++) {
      const {id, title, name, overview, poster_path, posterPath} = data[i];

      const isInMyList = _getIsIdInList(myList, id);

      // The Movie datamodel uses title, and the TV datamodel uses name
      const titleDisplay = title || name;

      _cards.push(
        <Card
          key={id}
          id={id}
          title={titleDisplay}
          overview={overview}
          posterPath={poster_path || posterPath}
          myListBtnContent={isInMyList ? <IconSubtract/> : <IconPlus/>}
          myListHandler={isInMyList ? myListRemoveHandler : myListAddHandler}
        />
      )
    }
    return _cards;
  }, [isMyList, myList, mediaItems, myListAddHandler, myListRemoveHandler]);

  return (
    <section>
      <h2 className="Card-row-title">
        {title}
      </h2>
      <ul className="Card-row" id={containerId}>
        {cards}
      </ul>
      {!isFirstVisible && <div className="Card-row-cover Cover-left"/>}
      {!isLastVisible && <div className="Card-row-cover Cover-right"/>}
    </section>
  )
}

export default CardRow;
