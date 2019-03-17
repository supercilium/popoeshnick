import React from 'react';
import PropTypes from 'prop-types';

const Buhlishko = React.memo(({ name, amount, lg }) => (
  <div>
    <span style={{ display: 'inline-block', padding: '0 10px' }}>{name}</span>
    <span style={{ display: 'inline-block', padding: '0 10px' }}>{`${amount} l`}</span>
    <span style={{ display: 'inline-block', padding: '0 10px' }}>{`+ ${lg} LG`}</span>
  </div>
));

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
