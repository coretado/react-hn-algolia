import React, { useContext, useEffect, useReducer, useState } from "react";
import { Theme } from "../../Session";
import axios from "axios";

import PostItem from "../PostItem";

const searchUrl = "http://hn.algolia.com/api/v1/search?query=";
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
        hits: payload
      };
    default:
      return state;
  }
};

const fetchDataApi = searchUrl => {
  const [query, setQuery] = useState(searchUrl);
  const [state, dispatch] = useReducer(fetchDataReducer, INITIAL_STATE);

  const fetchData = async () => {
    dispatch(FETCH_LOAD);

    try {
      const results = await axios.get(`${searchUrl}${query}`);

      dispatch({ type: FETCH_SUCCESS, payload: results });
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
  const { state } = useContext(Theme);
  const { day } = state;

  const onChangeSearch = event => {
    const { value } = event.target;
    setText(value);
  };

  return (
    <>
      <form>
        <input type="text" value={text} onChange={onChangeSearch} />
        <button type="submit" isDisabled={text} />
      </form>
      <hr />
      <PostItem theme={day} />
    </>
  );
};

export default PostList;
