import React, { Component, Fragment } from 'react';

class QueryOptions extends Component {
  state = {
    showMenu: false,
  }

  showMenu = (e) => {
    e.preventDefault();

    this.setState(() => ({ showMenu: true }),
      () => document.addEventListener('click', this.closeMenu)
    );
  }

  closeMenu = () => {
    this.setState(() => ({ showMenu: false }),
      () => document.removeEventListener('click', this.closeMenu)
    );
  }

  render() {
    return (
      <Fragment>
        {/* <span className='queryOptions-definition'>{this.props.definition}</span> */}
        <div className='column'>
          <button onClick={this.showMenu} className='queryOptions-button'>
            <span className='queryOptions-button--text'>{this.props.selected}</span>
            {this.state.showMenu
              ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className='queryOptions-dropdown'>
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className='queryOptions-dropdown'>
                <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
              </svg>}
          </button>
          {this.state.showMenu
            ? <ul className='queryOptions-menu' onClick={this.selectItem}>
              {this.props.options.map(option => (
                <li key={option} onClick={() => this.props.handleQuery(option, this.props.queryId)}>
                  {option}
                </li>
              ))}
            </ul>
            : null}
        </div>
      </Fragment>
    );
  }
}

export default QueryOptions;