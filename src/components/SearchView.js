import React, { Component } from 'react';

class SearchView extends Component {
  render() {
    const { search } = this.props.location;
    return (
      <div>
        {search}
      </div>
    );
  }
}

export default SearchView;