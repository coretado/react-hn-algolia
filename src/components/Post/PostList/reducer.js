import { useEffect, useReducer } from "react";
import {
  FETCH_LOAD,
  FETCH_SUCCESS,
  FETCH_FAIL,
  FETCH_TEXT_CHANGE,
  FETCH_TEXT_RESET
} from "./reducerTerms";
import axios from "axios";

const INITIAL_STATE = {
  error: false,
  results: {},
  loading: true,
  query: "react"
};

const DEFAULT_HITS = 20;

const fetchDataReducer = (state, { type, payload = null }) => {
  switch (type) {
    case FETCH_LOAD:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case FETCH_SUCCESS:
      const oldHits = state.results[state.query]
        ? state.results[state.query].hits
        : [];
      const updatedHits = [...oldHits, ...payload.hits];

      return {
        ...state,
        loading: false,
        results: {
          ...state.results,
          [state.query]: { hits: updatedHits, page: payload.page }
        }
      };
    case FETCH_TEXT_CHANGE:
      return {
        ...state,
        query: payload
      };
    case FETCH_TEXT_RESET:
      return {
        ...state,
        query: ""
      };
    default:
      return state;
  }
};

const fetchDataApi = searchUrl => {
  // page and query
  const [state, dispatch] = useReducer(fetchDataReducer, INITIAL_STATE);

  const fetchData = async (page = 0) => {
    const preExisting =
      state.results[state.query] && state.results[state.query].page + 1;

    try {
      const results = await axios.get(
        `${searchUrl}${state.query}&tags=story&page=${
          preExisting ? preExisting : page
        }&hitsPerPage=${DEFAULT_HITS}`
      );
      console.log(results);
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          hits: results.data.hits,
          page: preExisting ? preExisting : page
        }
      });
    } catch (error) {
      dispatch({ type: FETCH_FAIL });
    }
  };

  const paginate = () => {
    const { results, query } = state;
    let updatedPage = results[query].page + 1;

    fetchData(updatedPage);
  };

  const changeQuery = queryParam => {
    dispatch({ type: FETCH_TEXT_CHANGE, payload: queryParam });
  };

  useEffect(() => {
    fetchData();
  }, [state.query]);

  return { ...state, changeQuery, paginate };
};

export default fetchDataApi;
