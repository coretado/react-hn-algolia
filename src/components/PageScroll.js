import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class PageScroll extends Component {
  togglePage = (e) => {
    e.preventDefault();
    const test = e.target.id;
    const { search } = this.props.location;
    const { history } = this.props;
    const terms = queryString.parse(search);

    switch(test) {
      case 'prev':
        const pageDown = parseInt(terms.page, 10) - 1;
        history.push(`/?query=${terms.query}&type=${terms.type}&sort=${terms.sort}&page=${pageDown}`);
        return null;
      case 'next': 
        let pageUp = parseInt(terms.page, 10) + 1;
        console.log(pageUp);
        history.push(`/?query=${terms.query}&type=${terms.type}&sort=${terms.sort}&page=${pageUp}`);
        return null;
      default:
        alert('Something went wrong, returning to default search.');
        history.push(`/?query=&type=story&sort=search_by_date&page=0`);
        return null;
    }
  }

  render() {
    const { search } = this.props.location;
    const terms = queryString.parse(search);

    return (
      <Fragment>
        <div className='row pagination-spacing'>
          <button className='pagination-button' id='prev' disabled={terms.page === '0'} onClick={this.togglePage}>Prev</button>
          <button className='pagination-button' id='next' disabled={terms.page === '49'} onClick={this.togglePage}>Next</button>                    
          <div style={{marginLeft: 'auto'}}>
            <Link className='about-button' to='/about'>
              About
            </Link>
          </div>                              
        </div>         
      </Fragment>                 
    );
  }
}

export default withRouter(PageScroll);