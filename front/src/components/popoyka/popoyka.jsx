import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import { BuhlishkoList } from '../buhlishkoList';

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
}) => {
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);
  const period = (endDate - startDate) / 3600000;
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary style={{ flexDirection: 'column' }}>
          <Typography variant="subtitle1" gutterBottom>{`Popoyka ${startDate.toDateString()}`}</Typography>
          <span>{`dateStart: ${startDate.toTimeString()}`}</span>
          <span>{`duration: ${period} hrs`}</span>
          <span>{`location: ${location}`}</span>
          <span>{`budget: ${budget} ${currency}`}</span>
          <span>{`mode: ${mode}`}</span>
          <span>{`lygrylityAmount: ${lygrylityAmount}`}</span>
          <span>{`note: ${note}`}</span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
          <p>Buhlishko List</p>
          <BuhlishkoList data={buhlishkoList} />
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
};

export default Popoyka;
