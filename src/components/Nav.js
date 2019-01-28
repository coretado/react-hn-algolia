import React, { Component, Fragment } from 'react';
import { querySelector } from '../utility/querySelector';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Search from './Search';
import QueryOptions from './QueryOptions';

class Nav extends Component {
  state = {
    type: {
      value: 'new',
      options: ['new', 'comments', 'ask', 'show'],
      definition: 'Search',
      queryValue: 'story'
    },
    sort: {
      value: 'popularity',
      queryValue: 'search',
      options: ['popularity', 'date'],
      definition: 'by'
    },
    searchString: ''
  }  

  componentDidMount() {
    const { type, sort } = this.state; 
    const { history } = this.props;

    history.push(`/?query=&type=${type.queryValue}&sort=${sort.queryValue}&page=0`);
  }

  componentDidUpdate(prevProps, prevState) {
    const { type, sort } = this.state; 
    const { history, location } = this.props;

    if (prevState.type.value !== type.value || prevState.sort.value !== sort.value ) {
      const locationTerms = queryString.parse(location.search);
      history.push(`/?query=${locationTerms.query}&type=${type.queryValue}&sort=${sort.queryValue}&page=0`);          
    }    
  }

  handleInput = (e) => {
    const searchString = e.target.value;
    this.setState(() => ({searchString}));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { searchString, type, sort } = this.state; 

    history.push(`/?query=${searchString}&type=${type.queryValue}&sort=${sort.queryValue}&page=0`);
    // this.setState((prevState) => ({...prevState, searchString: ''}));
  }

  handleQuery = (option, queryId) => {
    this.setState((prevState) => (
      {...prevState, 
        [queryId]: {...prevState[queryId], 
          value: option, 
          queryValue: querySelector(option)
        }
      }
    ));
  }

  render() {
    const { searchString } = this.state;

    return (
      <Fragment>
        <Search 
          searchString={searchString} 
          handleInput={this.handleInput} 
          handleSubmit={this.handleSubmit} /> 
        <div className='container row spacer'>          
          {Object.keys(this.state).filter(item => item !== 'searchString').map(item => (
            <QueryOptions 
              key={item} 
              options={this.state[item].options} 
              queryId={item} 
              definition={this.state[item].definition} 
              handleQuery={this.handleQuery} 
              selected={this.state[item].value} />
          ))}        
        </div>
      </Fragment>      
    );
  }
}

export default withRouter(Nav);