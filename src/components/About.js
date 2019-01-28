import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='container'>
      <h1 className='about-heading'>About</h1>
      <div className='about-text-container'>
        <p className='about-text'>
          The icons used for this project are from the Zondicon package by <a href='https://www.zondicons.com/'>Adam Schoger</a>. 
          The api is by <a href='https://www.algolia.com/'>Algolia</a>. The api itself 
          is a custom search engine to parse HackerNews articles. It's pretty cool.
          This project was made by <a href='https://github.com/SNVtahoe'>SNVtahoe</a> with 
          ☕️ and ❤️ in Reno, Nevada.
        </p>
        <br />
        <Link to={`/?query=&type=story&sort=search&page=0`}>
          Click here to go back to the home page.
        </Link>
      </div>            
    </div>
  );
}

export default About;