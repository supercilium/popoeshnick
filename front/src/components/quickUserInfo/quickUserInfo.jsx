import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import {
  IconButton,
  Chip,
} from '@material-ui/core';

export class QuickUserInfo extends React.Component {
  renderLabel = () => (
    <div>
      <NavLink to="/profile" title="Profile">
        {this.props.alkash.name}
      </NavLink>
      <span>{this.props.alkash.rank}</span>
    </div>
  )

  render() {
    return (
      <Chip
        // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        icon={<FontAwesomeIcon icon="angry" size="lg" />}
        // label={<NavLink to="/profile" title="Profile">{this.props.alkash.name}</NavLink>}
        label={this.renderLabel()}
        clickable
      />
    )
  }
};

function mapStateToProps(state) {
  return {
    alkash: state.alkash,
  };
}

export default connect(mapStateToProps)(QuickUserInfo);