// Component Code Dependency
import React, { useContext, useState } from "react";
import fetchDataApi from "./reducer";
import { Theme } from "../../Session";

// UI Rendering Dependency
import Loading from "../../Loading";
import PostItem from "../PostItem";

const searchUrl = "https://hn.algolia.com/api/v1/search?query=";

const PostList = () => {
  const [text, setText] = useState("react");
  const {
    state: { day }
  } = useContext(Theme);
  const {
    query,
    results,
    loading,
    error,
    changeQuery,
    paginate
  } = fetchDataApi(searchUrl);

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
      <form className="searchField" onSubmit={onSubmitSearch}>
        <input type="text" value={text} onChange={onChangeSearch} />
        <button type="submit" disabled={noSubmit}>
          Search
        </button>
      </form>

      {loading || !results[query] ? (
        <Loading />
      ) : (
        <ul>
          {results[query].hits.map(hit => (
            <PostItem key={hit.objectID} theme={day} {...hit} />
          ))}
        </ul>
      )}

      {!loading && (
        <div className="searchButton">
          <button onClick={paginate}>Load more</button>
        </div>
      )}
    </>
  );
};

export default PostList;
