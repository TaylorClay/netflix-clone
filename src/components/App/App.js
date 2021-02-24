import { useState} from 'react';

import ShowCase from "../Showcase/Showcase";
import RowManager from "../RowManager/RowManager";
import Footer from "../Footer/Footer";
import {CATEGORIES} from "../../common/Categories";

import './App.css';

function App() {
  const [myList, setMyList] = useState([]);

  const addToMyList = (item) => {
    return (e) => {
      // Prevent this handler from bubbling up and breaking the flip card handler
      e.stopPropagation();

      setMyList((prevList) => [...prevList, {key: 'ml-'.concat(item.id), ...item}]);
    }
  }

  const removeFromMyList = (item) => {
    return (e) => {
      // Prevent this handler from bubbling up and breaking the flip card handler
      e.stopPropagation();

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
        slug={CATEGORIES.MOVIES.UPCOMING.SLUG}
        myList={myList}
        myListAddHandler={addToMyList}
        myListRemoveHandler={removeFromMyList}
      />
      <RowManager
        myList={myList}
        myListAddHandler={addToMyList}
        myListRemoveHandler={removeFromMyList}
      />
      <Footer />
    </div>
  )
}

export default App;
