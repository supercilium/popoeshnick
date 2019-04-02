import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = {
  span: {
    display: 'inline-block',
    padding: '0 10px',
  },
};

const Buhlishko = React.memo(({
  name,
  amount,
  lg,
  classes,
}) => (
  <div>
    <span className={classes.span}>{name}</span>
    <span className={classes.span}>{`${amount} l`}</span>
    <span className={classes.span}>{`+ ${lg} LG`}</span>
  </div>
));

Buhlishko.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.string,
  lg: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

Buhlishko.defaultProps = {
  name: '',
  amount: '',
  lg: '',
};

export default withStyles(styles)(Buhlishko);
