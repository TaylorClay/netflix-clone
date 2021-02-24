import {useEffect, useMemo, useState} from 'react';

import Card from "../Card/Card";
import IconPlus from "../../icons/IconPlus";
import IconSubtract from "../../icons/IconSubtract";
import {FETCH_STATUS} from "../../common/StateConstants";
import {useFetchCache} from "../../hooks/UseFetchCache";
import {_getIsIdInList} from "../../common/Utilities";

import './CardRow.css';

function CardRow({containerId, title, slug = null, myList: myListItems, myListAddHandler, myListRemoveHandler}) {
  const [isFirstVisible, setFirstVisible] = useState(false);
  const [isLastVisible, setLastVisible] = useState(false);

  const { status: fetchStatus, data: rowItems } = useFetchCache(slug);

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
  }, [containerId, rowItems]);

  // Creates and memoizes the list of Cards to be shown in the Row
  const cards = useMemo(() => {
    const isMyList = containerId === 'my-list';
    const _cards = [];
    const items = isMyList ? myListItems : rowItems;
    for (let i = 0; i < items.length; i++) {
      const {id, title, name, overview, poster_path, posterPath} = items[i];

      const isInMyList = _getIsIdInList(myListItems, id);

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
  }, [containerId, myListItems, rowItems, myListAddHandler, myListRemoveHandler]);

  return (
    <section>
      <h1 className="Card-row-title">
        {fetchStatus === FETCH_STATUS.LOADING ? 'Loading...' : title}
      </h1>
      <ul className="Card-row" id={containerId}>
        {cards}
      </ul>
      {!isFirstVisible && <div className="Card-row-cover Cover-left"/>}
      {!isLastVisible && <div className="Card-row-cover Cover-right"/>}
    </section>
  )
}

export default CardRow;
