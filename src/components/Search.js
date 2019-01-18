import React, { Component } from 'react';

const Nav = (props) => {
  return (
    <header className='search-bar'>
      <div className='app-logo'>
        RHNA
      </div>
      <form className='search-divide search-specify' onSubmit={props.handleSubmit}>   
        <div style={{display: 'flex', alignItems: 'center'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className='search-button'>
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
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
      <div style={{marginLeft: '1vw'}}>
        by Angolia
      </div>
    </header>
  );
}

export default Nav;