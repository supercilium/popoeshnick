import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  withStyles,
} from '@material-ui/core';
import { BuhlishkoList } from '../buhlishkoList';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  root: {
    flexDirection: 'row',
  },
  /* Styles applied to the children wrapper element. */
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  directionColumn: {
    flexDirection: 'column',
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
    marginLeft: '8px',
  },
  innerFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // iconGroup: {
  //   width: '48px',
  //   height: '48px',
  //   backgroundColor: '#ddd',
  //   lineHeight: '48px',
  // },
});

const Popoyka = ({
  buhlishkoList,
  dateStart,
  dateEnd,
  location,
  budget,
  currency,
  mode,
  lygrylityAmount,
  note,
  classes,
}) => {
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);
  const period = (endDate - startDate) / 3600000;
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary classes={{ root: classes.root, content: classes.content }}>
          <div className={classes.innerFlex}>
            {/* <div className={classes.iconGroup}>icon</div> */}
            <div className={classes.textLeft}>
              <Typography variant="subtitle1">{`${mode} mode ${location} popoyka`}</Typography>
              <Typography variant="caption">{`started: ${startDate.toDateString()} at ${startDate.getHours()}:${startDate.getMinutes()} lasts: ${period} hrs`}</Typography>
            </div>
          </div>
          <div>
            <Typography variant="button" className={classes.textRight}>{`+ ${lygrylityAmount}lg`}</Typography>
            <Typography variant="button" className={classes.textRight}>{`- ${budget} ${currency}`}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.directionColumn }}>
          <Typography variant="subtitle1">Buhlishko List</Typography>
          <BuhlishkoList data={buhlishkoList} />
          <Typography variant="body1">{`note: ${note}`}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

Popoyka.propTypes = {
  buhlishkoList: PropTypes.array,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  location: PropTypes.string,
  budget: PropTypes.number,
  currency: PropTypes.string,
  mode: PropTypes.string,
  lygrylityAmount: PropTypes.number,
  note: PropTypes.string,
  classes: PropTypes.object,
};

Popoyka.defaultProps = {
  buhlishkoList: [],
  dateStart: '',
  dateEnd: '',
  location: '',
  budget: 0,
  currency: '',
  mode: '',
  lygrylityAmount: 0,
  note: '',
  classes: {},
};

export default withStyles(styles)(Popoyka);
