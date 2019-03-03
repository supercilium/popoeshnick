import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { BuhlishkoList } from '../buhlishkoList';

export default (props) => {
  const { popoykaList } = props;
  return (
    <div>
      <h2>Hello Alkash!</h2>
      <PopoykaList {...popoykaList} />
    </div>
  );
};

class PopoykaList extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { expanded } = this.state;
    // const { buhlishkoList } = this.props;
    return (
      <div>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary>
            <Typography>General settings</Typography>
            <Typography>I am an expansion panel</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <BuhlishkoList {...this.props} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
