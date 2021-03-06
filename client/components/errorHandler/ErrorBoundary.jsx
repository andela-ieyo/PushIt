import React, { Component } from 'react';
import bunyan from 'bunyan';
import PropTypes from 'prop-types';

const log = bunyan.createLogger({ name: 'pushIt' });

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    log.info(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};


export default ErrorBoundary;
