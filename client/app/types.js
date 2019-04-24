import PropTypes from 'prop-types';

export const userShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
};
export const userType = PropTypes.shape(userShape);
