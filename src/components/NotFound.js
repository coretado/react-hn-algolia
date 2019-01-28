import React from 'react';
import queryString from 'query-string';

const NotFound = ({ location }) => (
  <div className='container'>
    <h1 className='error-heading'>Four oh Four</h1>
    <p className='error-text'>Sorry, there was an error with the search. Please refresh the page and try again.</p>
  </div>
);

export default NotFound;