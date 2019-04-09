// Component Code Dependency
import React, { useContext, useState } from "react";
import fetchDataApi from "./reducer";
import { Theme } from "../../Session";

// UI Rendering Dependency
import Loading from "../../Loading";
import PostItem from "../PostItem";

const searchUrl = "http://hn.algolia.com/api/v1/search?query=";

const PostList = () => {
  const [text, setText] = useState("react");
  const {
    state: { day }
  } = useContext(Theme);
  const { query, hits, loading, error, changeQuery, onPaginate } = fetchDataApi(
    searchUrl
  );

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

      {loading || !hits[query] ? (
        <Loading />
      ) : (
        <ul>
          {hits[query].hits.map(hit => (
            <PostItem key={hit.objectID} theme={day} {...hit} />
          ))}
        </ul>
      )}

      {!loading && <button onClick={onPaginate}>Load more</button>}
    </>
  );
};

export default PostList;
