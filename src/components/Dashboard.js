import React, { Component, Fragment } from 'react';
import { querySelector } from '../utility/querySelector';

import Search from './Search';
import QueryOptions from './QueryOptions';

class Dashboard extends Component {
  state = {
    type: {
      value: 'Stories',
      queryValue: 'story',
      options: ['All', 'Stories', 'Comments'],
      definition: 'Search'
    },
    sort: {
      value: 'Popularity',
      queryValue: 'byPopularity',
      options: ['Popularity', 'Date'],
      definition: 'by'
    }, 
    dateRange: {
      value: 'All time',
      queryValue: 'all',
      options: ['All time', 'Last 24h', 'Past Week', 'Past Month', 'Past Year'], 
      definition: 'for'
    },
    searchString: ''
  }

  handleInput = (e) => {
    const searchString = e.target.value;
    this.setState(() => ({searchString}));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({...prevState, searchString: ''}));
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
    return (
      <Fragment>
        <Search 
          searchString={this.state.searchString} 
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

export default Dashboard;