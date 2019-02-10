import React from 'react';

export default function withWidth(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { width: window.innerWidth };

      this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange() {
      this.setState({ width: window.innerWidth });
    }

    render() {
      return <WrappedComponent width={this.state.width} {...this.props} />;
    }
  }
}