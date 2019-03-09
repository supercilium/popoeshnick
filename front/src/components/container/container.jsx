import React from 'react';
import PropTypes from 'prop-types';

import {
  TopMenu,
} from '../topMenu';
// props = { x, y, z, children }
export const Container = ({ auth, children, handleLogout }) => (
  <div>
    <TopMenu
      auth={auth}
      onLogout={handleLogout}
    />
    {children}
  </div>
);

Container.propTypes = {
  auth: PropTypes.bool,
  children: PropTypes.element,
  handleLogout: PropTypes.func,
};

Container.defaultProps = {
  auth: false,
  children: {},
  handleLogout: () => {},
};

export default Container;
