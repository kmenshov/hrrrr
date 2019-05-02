import React from 'react';
import PropTypes from 'prop-types';

import { userShape } from 'app/types';

class User extends React.PureComponent {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
      <div>
        <span>{ this.props.id }</span>
        <span>{ this.props.name }</span>
        <button type="button" onClick={this.delete}>Delete</button>
      </div>
    );
  }
}

User.defaultProps = {
  onDelete: () => {},
};

User.propTypes = {
  ...userShape,
  onDelete: PropTypes.func,
};

export default User;
