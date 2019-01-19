import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class SearchView extends Component {
  state = {
    data: null,
    error: false
  }

  componentDidMount() {  
    const { search } = this.props.location;    
    const terms = queryString.parse(search); 

    if (Object.keys(terms).length > 0) {
      axios.get(`https://cors-anywhere.herokuapp.com/hn.algolia.com/api/v1/${terms.sort}?query=${terms.query}&tags=${terms.type}&numericFilters=&page=${terms.page}`)
      .then((response) => this.setState(() => ({data: response})))
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
    .then((response) => this.setState(() => ({data: response})))
    .catch((error) => {
      alert(error);
      this.setState(() => ({error: true}));
    });
  }

  render() {
    const { search } = this.props.location;
    const { data, error } = this.state;

    if (error) return <Redirect to='/errorOccured' />;

    if (!data) return <p>Loading...</p>;

    return (
      <div>
        {search}
      </div>
    );
  }
}

export default SearchView;