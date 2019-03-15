import React from "react";

import Nav from "../Nav";
import { PostList } from "../Post";

const App = () => (
  <>
    <Nav />

    <div className="container">
      <PostList />
    </div>
  </>
);

export default App;
