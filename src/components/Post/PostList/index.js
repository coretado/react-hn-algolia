import React, { useContext, useEffect, useReducer, useState } from "react";
import { Theme } from "../../Session";
import axios from "axios";

import Loading from "../../Loading";
import PostItem from "../PostItem";

const searchUrl = "http://hn.algolia.com/api/v1/search_by_date?query=";
const INITIAL_STATE = {
  error: false,
  loading: false,
  hits: []
};

const FETCH_LOAD = "FETCH_LOAD";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAIL = "FETCH_FAIL";

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
      return {
        ...state,
        loading: false,
        hits: [...payload]
      };
    default:
      return state;
  }
};

const fetchDataApi = searchUrl => {
  const [query, setQuery] = useState("");
  const [state, dispatch] = useReducer(fetchDataReducer, INITIAL_STATE);

  const fetchData = async () => {
    dispatch(FETCH_LOAD);

    try {
      const results = await axios.get(`${searchUrl}${query}&tags=story`);
      dispatch({ type: FETCH_SUCCESS, payload: results.data.hits });
    } catch (error) {
      dispatch({ type: FETCH_FAIL });
    }
  };

  const changeQuery = queryParam => {
    setQuery(queryParam);
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return { ...state, changeQuery };
};

const PostList = () => {
  const [text, setText] = useState("");
  const {
    state: { day }
  } = useContext(Theme);
  const { hits, loading, error, changeQuery } = fetchDataApi(searchUrl);

  const onChangeSearch = event => {
    const { value } = event.target;
    setText(value);
  };

  const onSubmitSearch = event => {
    event.preventDefault();

    changeQuery(text);
  };

  const noSubmit = text === "";

  return (
    <>
      <form onSubmit={onSubmitSearch}>
        <input type="text" value={text} onChange={onChangeSearch} />
        <button type="submit" disabled={noSubmit} />
      </form>
      <hr />
      {loading ? (
        <Loading />
      ) : (
        <ul>
          {hits.map(hit => (
            <PostItem key={hit.objectID} theme={day} {...hit} />
          ))}
        </ul>
      )}
      {error && (
        <div>
          <p>Something went wrong.</p>
        </div>
      )}
    </>
  );
};

export default PostList;
