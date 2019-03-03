import React from 'react';
import PropTypes from 'prop-types';

export const Buhlishko = props => (
  <div>
    <span>{props.name}</span>
    <span>{props.amount}</span>
    <span>{props.lg}</span>
  </div>
);

Buhlishko.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.string,
  lg: PropTypes.string,
};

Buhlishko.defaultProps = {
  name: '',
  amount: '',
  lg: '',
};

export default Buhlishko;
