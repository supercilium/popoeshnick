import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  AppBar,
  Toolbar,
  Link,
} from '@material-ui/core'


export const Layout = ({ auth, children, handleLogout }) => (
  <Container
    maxWidth={false}
    disableGutters={true}
  >
    <AppBar
      position="static"
    >
      <Toolbar>
        <Link href="/" color="inherit">Popoeshnick.club</Link>
      </Toolbar>
    </AppBar>
    {children}
  </Container>
);

Layout.propTypes = {
  auth: PropTypes.bool,
  children: PropTypes.element,
  handleLogout: PropTypes.func,
};

Layout.defaultProps = {
  auth: false,
  children: {},
  handleLogout: () => {},
};

export default Layout;
