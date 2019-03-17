import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
} from '@material-ui/core';
import Popoyka from './popoyka';

const PopoykaList = React.memo(({ data }) => (
  <div>
    <Typography variant="h6" gutterBottom>Your completed popoykas</Typography>
    {data.map(item => <Popoyka key={`${item.dateStart}_${item.location}`} {...item} />)}
  </div>
));

PopoykaList.propTypes = {
  data: PropTypes.array,
};

PopoykaList.defaultProps = {
  data: [],
};

export default PopoykaList;
