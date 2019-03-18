import React, { useContext } from "react";
import { Theme } from "../Session";

import Nav from "../Nav";
import { PostList } from "../Post";

const App = () => {
  const {
    state: { day }
  } = useContext(Theme);

  return (
    <div className={day ? "app-container-day" : "app-container-night"}>
      <Nav />

      <div className="container">
        <PostList />
      </div>
    </div>
  );
};

export default App;
