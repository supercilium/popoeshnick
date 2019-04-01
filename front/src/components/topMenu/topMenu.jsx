import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  // IconButton,
  // MenuItem,
  // Menu,
} from '@material-ui/core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  navLink: {
    color: '#fff',
    textDecoration: 'none',
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
      // onLogout
    } = this.props;
    // const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="static">
          <Toolbar
            variant="dense"
            style={{ justifyContent: 'space-between' }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
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
                <NavLink className={classes.navLink} to="/profile">Profile</NavLink>
                {/* <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                  style={{ float: 'right' }}
                >
                  <FontAwesomeIcon icon="user" />
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