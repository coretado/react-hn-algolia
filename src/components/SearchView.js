import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Loading from './Loading';
import PageScroll from './PageScroll';
import Post from './Post';

class SearchView extends Component {
  state = {
    posts: null,
    error: false, 
    loading: true
  }

  componentDidMount() {  
    const { search } = this.props.location;    
    const terms = queryString.parse(search); 

    if (Object.keys(terms).length > 0) {
      axios.get(`https://cors-anywhere.herokuapp.com/hn.algolia.com/api/v1/${terms.sort}?query=${terms.query}&tags=${terms.type}&numericFilters=&page=${terms.page}`)
      .then((response) => this.setState((prevState) => ({...prevState, posts: response, loading: false})))
      .catch((error) => {
        alert(error);
        this.setState(() => ({error: true}));
      });
    }    
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props.location;

    if (prevProps.location.search === search) return;

    this.setState(() => ({loading: true}));

    const terms = queryString.parse(search);   

    axios.get(`https://cors-anywhere.herokuapp.com/hn.algolia.com/api/v1/${terms.sort}?query=${terms.query}&tags=${terms.type}&numericFilters=&page=${terms.page}`)
    .then((response) => this.setState((prevState) => ({...prevState, posts: response, loading: false})))    
    .catch((error) => {
      alert(error);
      this.setState(() => ({error: true}));
    });
  }

  render() {
    const { posts, error, loading } = this.state; 

    if (error) return <Redirect to='/errorOccured' />;

    if (loading) {
      return <Loading text='Loading' speed={300} />;    
    }

    return (
      <div className='container'>
        <span className='post-search-info'>
          {posts.data.hitsPerPage} items / {posts.data.nbPages} pages (total: {posts.data.nbHits})
        </span>
        <div className='column'>
          {posts.data.hits.map(hit => (
            <Post 
              key={hit.objectID} 
              post={hit} />
          ))}
        </div>
        <PageScroll />
      </div>
    );
  } 
}

export default SearchView;