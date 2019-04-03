import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  withStyles,
  Button,
  IconButton,
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

const AlkashCard = ({ name, email, lygrylity }) => (
  <Card
    style={{ textAlign: 'left' }}
  >
    <CardHeader
      avatar={
        (
          // eslint-disable-next-line react/jsx-one-expression-per-line
          <Avatar aria-label="Recipe">
            R
          </Avatar>
        )
      }
      action={
        (
          <IconButton>
            <FontAwesomeIcon icon="user-cog" />
          </IconButton>
        )
      }
      title={name}
      subheader={email}
    />
    {/* <div style={{ padding: '0 20px' }}>
      <Avatar alt="Remy Sharp" className={classes.bigAvatar} />
    </div> */}
    <CardContent>
      <Typography paragraph>{`You have ${lygrylity} lygryls`}</Typography>
      <Typography paragraph>Your rank is &quot;Newbie&quot;</Typography>
    </CardContent>
    <CardActions>
      <Button>Overview</Button>
      <Button>More info</Button>
    </CardActions>
  </Card>
);

AlkashCard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  lygrylity: PropTypes.number,
};

AlkashCard.defaultProps = {
  name: 'Unnamed',
  email: 'unnamed@nowhere',
  lygrylity: 0,
};

const Home = React.memo(({
  name,
  email,
  popoykaList,
  classes,
  lygrylity,
}) => (
  <div className={classes.wrapper}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Hello Alkash!</Typography>
        <Button variant="contained" color="primary">Start New Popoyka</Button>
      </Grid>
      <Grid item xs={4}>
        {/* TODO move to separate component AlkashCommons */}
        {/* <Typography variant="h6" gutterBottom>Your alkash profile</Typography> */}
        <AlkashCard {...{ name, email, lygrylity }} />
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
  lygrylity: PropTypes.number,
};

Home.defaultProps = {
  name: '',
  email: '',
  popoykaList: [],
  lygrylity: 0,
};


export default withStyles(styles)(Home);
