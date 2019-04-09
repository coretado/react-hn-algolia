// Component Code Dependency
import React, { useContext, useState } from "react";
import fetchDataApi from "./reducer";
import { Theme } from "../../Session";

// UI Rendering Dependency
import Loading from "../../Loading";
import PostItem from "../PostItem";

const searchUrl = "http://hn.algolia.com/api/v1/search?query=";

const PostList = () => {
  const [text, setText] = useState("");
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

      {loading ? (
        <Loading />
      ) : (
        <ul>
          {hits.map(hit => (
            <PostItem key={hit.objectID} theme={day} {...hit} />
          ))}
        </ul>
      )}

      {query < 50 ? (
        <button onClick={onPaginate}>Load more</button>
      ) : (
        <span>Nothing left!</span>
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
