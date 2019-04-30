import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  IconButton,
  // IconButton,
  // MenuItem,
  // Menu,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  // state = {
  //   anchorEl: null,
  // };

  // handleMenu = (event) => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  // handleClose = () => {
  //   this.setState({ anchorEl: null });
  // };

  render() {
    // const { anchorEl } = this.state;
    const {
      auth,
      classes,
      onLogout,
    } = this.props;
    // const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="static">
          <Toolbar
            variant="dense"
            classes={{ root: classes.toolbar }}
          >
            <div
              classes={{ root: classes.div }}
            >
              {/* <IconButton color="inherit" aria-label="Menu">
                <FontAwesomeIcon icon="bars" />
              </IconButton> */}
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              <Typography variant="h6" color="inherit">
                <NavLink className={classes.navLink} to="/">Popoeshnick.club</NavLink>
              </Typography>
            </div>
            {auth && (
              <div>
                <IconButton classes={{ root: classes.btnRoot }}>
                  <NavLink className={classes.navLink} to="/profile" title="Profile">
                    <FontAwesomeIcon icon="user" />
                  </NavLink>
                </IconButton>
                <IconButton classes={{ root: classes.btnRoot }} title="Log Out" onClick={onLogout}>
                  <FontAwesomeIcon icon="sign-out-alt" />
                </IconButton>
                {/* <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  style={{ float: 'right' }}
                >
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                  </MenuItem>
                  <MenuItem onClick={onLogout}>Log Out</MenuItem>
                </Menu> */}
              </div>
            )}
          </Toolbar>
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
