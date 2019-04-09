import { useEffect, useReducer } from "react";
import {
  FETCH_LOAD,
  FETCH_SUCCESS,
  FETCH_FAIL,
  FETCH_TEXT_CHANGE,
  FETCH_TEXT_RESET,
  FETCH_PAGE_CHANGE,
  FETCH_PAGE_RESET
} from "./reducerTerms";
import axios from "axios";

const INITIAL_STATE = {
  error: false,
  hits: [],
  loading: false,
  query: "",
  page: 0
};

const DEFAULT_HITS = 50;

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
    case FETCH_PAGE_CHANGE:
      return {
        ...state,
        page: state.page + 1
      };
    case FETCH_PAGE_RESET:
      return {
        ...state,
        page: 0
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        hits: [...state.hits, ...payload]
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

  const fetchData = async () => {
    dispatch(FETCH_LOAD);

    try {
      const results = await axios.get(
        `${searchUrl}${state.query}&tags=story&page=${
          state.page
        }&hitsPerPage=${DEFAULT_HITS}`
      );
      console.log(results);
      dispatch({ type: FETCH_SUCCESS, payload: results.data.hits });
    } catch (error) {
      dispatch({ type: FETCH_FAIL });
    }
  };

  const changeQuery = queryParam => {
    dispatch({ type: FETCH_TEXT_CHANGE, payload: queryParam });
  };

  const onPaginate = () => {
    console.log("I hit paginate");
  };

  useEffect(() => {
    fetchData();
  }, [state.query, state.page]);

  return { ...state, changeQuery, onPaginate };
};

export default fetchDataApi;
