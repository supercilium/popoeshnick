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
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: '1',
    padding: '8px',
  },
  leftWrapper: {
    flexGrow: '0.7',
    padding: '0 8px',
  },
  rightWrapper: {
    flexGrow: '0.3',
    margin: '-8px',
    backgroundColor: '#fff',
    height: '100vh',
  },
  btnRoot: {
    marginLeft: '24px',
  },
  typographyRoot: {
    // textAlign: 'left',
    marginTop: '25px',
    color: '#fff',
  },
});

const cardStyles = ({
  card: {
    textAlign: 'left',
  },
});

const AlkashCard = withStyles(cardStyles)(({
  name,
  email,
  lygrylity,
  classes,
}) => (
  <Card
    classes={{ root: classes.card }}
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
));

AlkashCard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  lygrylity: PropTypes.number,
  classes: PropTypes.any.isRequired,
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
    {/* <Grid container spacing={16}> */}
    <div className={classes.leftWrapper}>
      <Grid container xs={12} spacing={16}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            classes={{ root: classes.typographyRoot }}
            gutterBottom
            // eslint-disable-next-line react/jsx-one-expression-per-line
          >
            Hello Alkash!
            <Button
              variant="contained"
              color="primary"
              classes={{ root: classes.btnRoot }}
            // eslint-disable-next-line react/jsx-one-expression-per-line
            >
              Start New Popoyka
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <AlkashCard {...{ name, email, lygrylity }} />
        </Grid>
        <Grid item xs={6}>
          {/* <div style={{ marginTop: '56px' }} /> */}
          <AlkashCard {...{ name: 'Team Score', email: 'placeholder', lygrylity: 25 }} />
          {/* <AlkashCard {...{ name: 'Mr. Liver\'s advices', email: 'placeholder', lygrylity: 25 }} /> */}
        </Grid>
      </Grid>
    </div>
    <div className={classes.rightWrapper}>
      {/* <Grid item xs={4} classes={{ item: classes.item }}> */}
      <PopoykaList data={popoykaList} />
      {/* </Grid> */}
    </div>
    {/* </Grid> */}
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
