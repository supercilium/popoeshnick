import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Avatar,
  Paper,
  withStyles,
  Button,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  wrapper: {
    flexGrow: '1',
    padding: '28px 8px 0',
  },
  btnRoot: {
    minWidth: '24px',
  },
});

const AlkshCard = ({ classes, name, email }) => (
  <Paper
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '20px 0',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ padding: '0 20px' }}>
      <Avatar alt="Remy Sharp" className={classes.bigAvatar} />
    </div>
    <div style={{ textAlign: 'left' }}>
      <Typography variant="body1" gutterBottom>{name}</Typography>
      <Typography variant="body1" gutterBottom>{email}</Typography>
      <Typography variant="body1" gutterBottom>Your rank is &quot;Newbie&quot;</Typography>
    </div>
    <div>
      <Button
        classes={{ root: classes.btnRoot }}
      >
        <FontAwesomeIcon icon="user-cog" />
      </Button>
    </div>
  </Paper>
);


const Home = React.memo(({
  name,
  email,
  popoykaList,
  classes,
}) => (
  <div className={classes.wrapper}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Hello Alkash!</Typography>
        <Button variant="contained" color="primary">Start New Popoyka</Button>
      </Grid>
      <Grid item xs={4}>
        {/* TODO move to separate component AlkashCommons */}
        <Typography variant="h6" gutterBottom>Your alkash profile</Typography>
        <AlkshCard {...{ classes, name, email }} />
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
));


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
