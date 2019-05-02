import React from 'react';
import PropTypes from 'prop-types';

class UserCreate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({
      name: this.state.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Create" />
      </form>
    );
  }
}

UserCreate.defaultProps = {
  onSubmit: () => {},
};

UserCreate.propTypes = {
  onSubmit: PropTypes.func,
};

export default UserCreate;
