import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Loading from './Loading';
import Post from './Post';

class SearchView extends Component {
  state = {
    posts: null,
    error: false
  }

  componentDidMount() {  
    const { search } = this.props.location;    
    const terms = queryString.parse(search); 

    if (Object.keys(terms).length > 0) {
      axios.get(`https://cors-anywhere.herokuapp.com/hn.algolia.com/api/v1/${terms.sort}?query=${terms.query}&tags=${terms.type}&numericFilters=&page=${terms.page}`)
      .then((response) => this.setState(() => ({posts: response})))
      .catch((error) => {
        alert(error);
        this.setState(() => ({error: true}));
      });
    }    
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props.location;

    if (prevProps.location.search === search) return;

    const terms = queryString.parse(search);   

    axios.get(`https://cors-anywhere.herokuapp.com/hn.algolia.com/api/v1/${terms.sort}?query=${terms.query}&tags=${terms.type}&numericFilters=&page=${terms.page}`)
    .then((response) => this.setState(() => ({posts: response})))
    .catch((error) => {
      alert(error);
      this.setState(() => ({error: true}));
    });
  }

  render() {
    const { search } = this.props.location;
    const { posts, error } = this.state; 

    if (error) return <Redirect to='/errorOccured' />;

    if (!posts) {
      return <Loading text='Loading' speed={300} />;    
    }

    return (
      <div className='container'>
        <span className='post-search-info'>
          {posts.data.hitsPerPage} items per {posts.data.nbPages} pages (total: {posts.data.nbHits})
        </span>
        <div className='column'>
          {posts.data.hits.map(hit => (
            <Post 
              key={hit.objectID} 
              post={hit} />
          ))}
        </div>        
      </div>
    );
  } 
}

export default SearchView;