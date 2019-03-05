import React from 'react';
import PropTypes from 'prop-types';
import { PopoykaList } from '../popoyka';

const Home = ({ popoykaList }) => (
  <div>
    <h2>Hello Alkash!</h2>
    <PopoykaList data={popoykaList} />
  </div>
);


Home.propTypes = {
  popoykaList: PropTypes.array,
};

Home.defaultProps = {
  popoykaList: [],
};

export default Home;
