import React from 'react';

const Nav = (props) => {
  return (
    <header className='search-bar'>
    <div className='header-container'>
      <div className='app-logo'>
        <svg className='app-logo-symbol' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M4 11H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2V1h14v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm0-2V5H2v4h2zm-2 8v-1h18v1l-4 2H6l-4-2z" />
        </svg>
        RHNA
      </div>
      <form className='search-divide search-specify' onSubmit={props.handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className='search-button'>
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
          </svg>
          <input
            type="search"
            id="search"
            onChange={props.handleInput}
            placeholder={`What is the average air speed velocity of a laden swallow`}
            className='search'
            value={props.searchString} />
        </div>
      </form>
      <div style={{ marginLeft: '1vw' }}>
        <span style={{ fontSize: '1.6rem' }}>by <a href='https://hn.algolia.com/api'>Angolia</a></span>
      </div>
    </div>
    </header>
  );
}

export default Nav;