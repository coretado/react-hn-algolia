import React from 'react';

const NotFound = ({ location }) => (
  <div>
    <p>Sorry, {location.pathname} was not found.</p>
  </div>
);

export default NotFound;