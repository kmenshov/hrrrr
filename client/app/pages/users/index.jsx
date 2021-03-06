/* eslint-disable react/prefer-stateless-function, no-unused-vars, react/destructuring-assignment */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { userType } from 'app/types';
import { getUsers } from 'app/selectors';
import { ASYNC, fetchUsers, createUser, deleteUser } from 'app/actions';

import User from './User';
import UserCreate from './UserCreate';

const mapStateToProps = state => ({
  users: getUsers(state),
});

const mapDispatchToProps = {
  fetchUsers: fetchUsers[ASYNC.request],
  createUser: createUser[ASYNC.request],
  deleteUser: deleteUser[ASYNC.request],
};

class Users extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const users = this.props.users.map(user => (
      <User {...user} onDelete={this.props.deleteUser} key={`user-${user.id}`} />
    ));

    return (
      <React.Fragment>
        {users}
        <UserCreate onSubmit={this.props.createUser} />
      </React.Fragment>
    );
  }
}

Users.defaultProps = {
  users: [],

  fetchUsers: () => {},
  createUser: () => {},
  deleteUser: () => {},
};

Users.propTypes = {
  users: PropTypes.arrayOf(userType),

  fetchUsers: PropTypes.func,
  createUser: PropTypes.func,
  deleteUser: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
