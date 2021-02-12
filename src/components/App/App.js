import { Suspense, lazy, useState} from 'react';

import ShowCase from "../Showcase/Showcase";
import {CATEGORIES} from "../../common/Categories";

import './App.css';

const RowManager = lazy(() => import('../RowManager/RowManager'));
const Footer = lazy(() => import('../Footer/Footer'));

function App() {
  const [myList, setMyList] = useState([]);

  const addToMyList = (item) => {
    return () => {
      setMyList((prevList) => [...prevList, {key: 'ml-'.concat(item.id), ...item}]);
    }
  }

  const removeFromMyList = (item) => {
    return () => {
      const itemIndex = myList.findIndex((currItem) => currItem.id === item.id);
      if (itemIndex >= 0) {
        setMyList((prevList) => {
          const newList = [...prevList];
          newList.splice(itemIndex, 1);
          return newList;
        })
      }
    }
  }

  return (
    <div id="App">
      <ShowCase
        title={CATEGORIES.MOVIES.UPCOMING.TITLE}
        slug={CATEGORIES.MOVIES.UPCOMING.SLUG}
        myList={myList}
        myListAddHandler={addToMyList}
        myListRemoveHandler={removeFromMyList}
      />
      <Suspense fallback={null}>
        <RowManager
          myList={myList}
          myListAddHandler={addToMyList}
          myListRemoveHandler={removeFromMyList}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Footer/>
      </Suspense>
    </div>
  )
}

export default App;
