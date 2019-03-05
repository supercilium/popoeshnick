import React from 'react';
import PropTypes from 'prop-types';

const Buhlishko = ({ name, amount, lg }) => (
  <div>
    <span style={{ display: 'inline-block', padding: '5px 15px' }}>{name}</span>
    <span style={{ display: 'inline-block', padding: '5px 15px' }}>{amount}</span>
    <span style={{ display: 'inline-block', padding: '5px 15px' }}>{lg}</span>
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
