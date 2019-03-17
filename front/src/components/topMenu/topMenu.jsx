import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class TopMenu extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { auth, onLogout } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="static">
          <Toolbar
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
                Popoeshnick.club
              </Typography>
            </div>
            {auth && (
              <div>
                <IconButton
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
                    <NavLink to="/profile">Profile</NavLink>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <NavLink to="/">Home</NavLink>
                  </MenuItem>
                  <MenuItem onClick={onLogout}>Log Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopMenu.propTypes = {
  onLogout: PropTypes.func,
  auth: PropTypes.bool,
};

TopMenu.defaultProps = {
  auth: false,
  onLogout: () => {},
};
