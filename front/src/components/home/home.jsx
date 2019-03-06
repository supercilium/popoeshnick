import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { PopoykaList } from '../popoyka';

const Home = ({ popoykaList }) => (
  <div style={{ flexGrow: '1', padding: '28px 8px 0' }}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>Hello Alkash!</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>Alkash avatar &amp; name</Typography>
        <Typography variant="h6" gutterBottom style={{ marginTop: '100px' }}>Your upcoming events</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>Alkash regards</Typography>
        <Typography variant="h6" gutterBottom style={{ marginTop: '100px' }}>Mr&apos;s Liver advices</Typography>
      </Grid>
      <Grid item xs={4}>
        <PopoykaList data={popoykaList} />
      </Grid>
    </Grid>
  </div>
);


Home.propTypes = {
  popoykaList: PropTypes.array,
};

Home.defaultProps = {
  popoykaList: [],
};

export default Home;
