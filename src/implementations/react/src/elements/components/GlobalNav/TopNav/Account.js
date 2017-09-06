import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AccountAdapter from '../../../../adapters/GlobalNav/TopNav/AccountAdapter';

class Account extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    onClick: PropTypes.func.isRequired
  }

  handleClick = () => {
    this.props.onClick(this.props.id);
  }

  render() {
    const { id, title, onClick, ...otherProps } = this.props;
    return (<AccountAdapter onClick={this.handleClick} {...otherProps} />);
  }
}

export default Account;