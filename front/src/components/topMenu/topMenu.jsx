import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  IconButton,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuickUserInfo from '../quickUserInfo';

const styles = theme => ({
  toolbar: {
    justifyContent: 'space-between',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
  btnRoot: {
    color: '#fff',
    fontSize: theme.typography.pxToRem(16),
    padding: 8,
  },
});

export class TopMenu extends React.PureComponent {
  render() {
    // const { anchorEl } = this.state;
    // const {
    //   auth,
    //   classes,
    //   onLogout,
    // } = this.props;
    // const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar
          title="Popoeshnick"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        >
          {/* <Toolbar
            variant="dense"
            classes={{ root: classes.toolbar }}
          >
            <div
              classes={{ root: classes.div }}
            >
              <NavLink className={classes.navLink} to="/">Popoeshnick.club</NavLink>
            </div>
            {auth && (
              <div>
                <QuickUserInfo />
                <IconButton classes={{ root: classes.btnRoot }} title="Log Out" onClick={onLogout}>
                  <FontAwesomeIcon icon="sign-out-alt" />
                </IconButton>
              </div>
            )}
          </Toolbar> */}
        </AppBar>
      </div>
    );
  }
}

TopMenu.propTypes = {
  classes: PropTypes.any,
  onLogout: PropTypes.func,
  auth: PropTypes.bool,
};

TopMenu.defaultProps = {
  classes: {},
  auth: false,
  onLogout: () => {},
};

export default withStyles(styles)(TopMenu);
