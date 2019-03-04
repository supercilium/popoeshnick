import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { BuhlishkoList } from '../buhlishkoList';

export const Popoyka = props => (
  <div>
    <ExpansionPanel expanded={true}>
      <ExpansionPanelSummary>
        <Typography>General settings</Typography>
        <Typography>I am an expansion panel</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <BuhlishkoList {...props} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
);

export default Popoyka;
