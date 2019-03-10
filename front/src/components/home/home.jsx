import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Avatar,
  withStyles,
} from '@material-ui/core';
import { PopoykaList } from '../popoyka';

const styles = ({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});


const Home = ({
  name,
  email,
  popoykaList,
  classes,
}) => (
  <div style={{ flexGrow: '1', padding: '28px 8px 0' }}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>Hello Alkash!</Typography>
      </Grid>
      <Grid item xs={4} justify="center" alignItems="center">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.bigAvatar} />
        <Typography variant="body1" gutterBottom>{name}</Typography>
        <Typography variant="body1" gutterBottom>{email}</Typography>
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
  name: PropTypes.string,
  email: PropTypes.string,
  classes: PropTypes.object.isRequired,
  popoykaList: PropTypes.array,
};

Home.defaultProps = {
  name: '',
  email: '',
  popoykaList: [],
};


export default withStyles(styles)(Home);
