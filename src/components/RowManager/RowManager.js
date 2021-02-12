import {useEffect, useState} from 'react';

import CardRow from "../CardRow/CardRow";
import {CATEGORIES} from "../../common/Categories";

import './RowManager.css';

// Creates the ordered list of rows to be fetched as the user scrolls down
const ROW_DATA = (() => {
  const movieSlugs = Object.values(CATEGORIES.MOVIES).filter(movie => movie.SLUG !== CATEGORIES.MOVIES.UPCOMING.SLUG);
  const tvSlugs = Object.values(CATEGORIES.TV);
  const minLength = Math.min(movieSlugs.length, tvSlugs.length);

  // Interleave Movie and TV slugs
  const rows = [];
  for (let i = 0; i < minLength; i++) {
    rows.push(movieSlugs[i], tvSlugs[i]);
  }
  rows.push(...movieSlugs.slice(minLength), ...tvSlugs.slice(minLength));

  return rows;
})();

function RowManager ({ myList, myListAddHandler, myListRemoveHandler }) {
  const [rows, setRows] = useState([{ ...ROW_DATA[0] }]);

  // Handles fetching new rows as a result of the user scrolling down
  useEffect(() => {
    const callback = (entries) => {
      const lastEntry = entries[entries.length - 1];
      if (lastEntry.isIntersecting && rows.length < ROW_DATA.length) {
        setRows(prevRows => [...prevRows, { ...ROW_DATA[prevRows.length] } ])
      }
    }
    const listEl = document.querySelector('#Row-container');
    const options = { threshold: .25 };
    const observer = new IntersectionObserver(callback, options);

    // Observe the last row
    if (listEl?.lastElementChild) observer.observe(listEl.lastElementChild);

    return () => observer.disconnect();
  }, [rows.length]);

  return (
    <main id="Row-container">
      {myList.length > 0 && (
        <CardRow
          key={'my-list'}
          containerId={'my-list'}
          title={'My List'}
          myList={myList}
          myListAddHandler={myListAddHandler}
          myListRemoveHandler={myListRemoveHandler}
        />
      )}
      {rows.map((row, index) => {
        return (
          <CardRow
            key={`row-${index}`}
            containerId={`row-${index}`}
            title={row.TITLE}
            slug={row.SLUG}
            myList={myList}
            myListAddHandler={myListAddHandler}
            myListRemoveHandler={myListRemoveHandler}
          />
        );
      })}
    </main>
  );
}

export default RowManager;