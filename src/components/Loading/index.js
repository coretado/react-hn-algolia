import React, { Component } from 'react';

class Loading extends Component {
  state = {
    text: this.props.text
  }

  componentDidMount() {
    const { text, speed } = this.props;
    const stopper = `${text}...`;
    this.interval = window.setInterval(() => {
      this.state.text === stopper 
        ? this.setState((prevState) => ({...prevState, text: text})) 
        : this.setState((prevState) => ({...prevState, text: prevState.text + '.'}))
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className='container'>
        <span className='loading-text'>
          {this.state.text}
        </span>
      </div>      
    );
  }
}

export default Loading;