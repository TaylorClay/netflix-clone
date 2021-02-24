import { useEffect, useRef, useReducer } from 'react';

import {FETCH_STATUS} from "../common/StateConstants";
import {API_KEY} from "../common/Secrets";
import {_isStale} from "../common/Utilities";

/**
 * Custom hook to fetch and cache data from the TMDB API
 *
 * This hook supports:
 *   - caching data up to a given number of days
 *   - call retry
 *
 * @param slug The slug to retrieve the data from
 * @param cacheDurationInDays The number of days to cache the data before re-fetching from the API
 * @returns {Object} The state object, which contains the status of the call and the resulting data
 */
export const useFetchCache = (slug, cacheDurationInDays = 1) => {
  const CACHE = useRef(JSON.parse(window.localStorage.getItem(slug)) || {});

  const cacheData = (slug, data) => {
    CACHE.current[slug] = { timestamp: Date.now(), items: [...data] };

    try {
      window.localStorage.setItem(slug, JSON.stringify(CACHE.current));
    } catch (e) {
      console.error(`Unable to store slugs cache in localStorage`);
    }
  }
  
  const INITIAL_STATE = {
    status: FETCH_STATUS.SUCCESS,
    data: [],
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case FETCH_STATUS.LOADING:
        return { ...INITIAL_STATE, status: FETCH_STATUS.LOADING };
      case FETCH_STATUS.SUCCESS:
        return { ...INITIAL_STATE, status: FETCH_STATUS.SUCCESS, data: action.payload };
      case FETCH_STATUS.FAILURE:
        return { ...INITIAL_STATE, status: FETCH_STATUS.FAILURE };
      default:
        return state;
    }
  }, INITIAL_STATE);

  useEffect(() => {
    if (!slug) {
      return;
    }

    let tries = 1;
    let shouldCancel = false; // Flag to prevent operating on component if it has been unmounted before fetch resolves

    (async function doFetch() {
      // We want to ensure we don't get the "loading flicker" effect in our average case
      // If the call is exceptionally slow (i.e. > 1s), we'll go ahead and show a spinner
      // This may still result in a flicker if the call resolves shortly after this timer
      const LOADING_INDICATOR_DELAY = 1_000;
      const timeoutId = setTimeout(() => dispatch({ type: FETCH_STATUS.LOADING }), LOADING_INDICATOR_DELAY);

      // Prioritize using the cache if we can
      if (CACHE.current[slug] && !_isStale(CACHE.current[slug].timestamp, cacheDurationInDays)) {
        clearTimeout(timeoutId);
        dispatch({ type: FETCH_STATUS.SUCCESS, payload: CACHE.current[slug].items });
      } else {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/${slug}?api_key=${API_KEY}`);
          if (!response.ok) {
            throw new Error(`Server responded with code ${response.status} at ${new Date()}`)
          }
          clearTimeout(timeoutId);
          const dataWrapper = await response.json();
          const data = dataWrapper.results;

          if (shouldCancel) {
            return;
          }

          tries = 1;
          cacheData(slug, data)
          dispatch({ type: FETCH_STATUS.SUCCESS, payload: data });
        } catch (error) {
          if (shouldCancel) {
            return;
          }

          // In a real app, we would need better error handling,
          // including handling individual Exception/Error types
          console.error(error.message);

          // Retry up to 10 times with linear backoff
          if (tries < 10) {
            setTimeout(() => {
              doFetch()
            }, tries * 1000);
            tries++;
          }
        }
      }
    })();

    return () => {
      shouldCancel = true;
    };
  }, [slug, cacheDurationInDays]);

  return state;
};