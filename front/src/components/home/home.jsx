import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';


export default () => (
  <div>
    <h2>Hello Alkash!</h2>
    <PopoykaList />
  </div>
);

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

    return (
      <div>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary>
            <Typography>General settings</Typography>
            <Typography>I am an expansion panel</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>xui</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
