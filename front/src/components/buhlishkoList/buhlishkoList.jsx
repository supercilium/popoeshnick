import React from 'react';
import PropTypes from 'prop-types';
import Buhlishko from './buhlishko';

export const BuhlishkoList = (props) => {
  const { buhlishkoList } = props;
  return (
    buhlishkoList.map((item, i) => <Buhlishko key={`${item.name}_${i}`} {...item} />)
  );
};


BuhlishkoList.propTypes = {
  buhlishkoList: PropTypes.array,
};

BuhlishkoList.defaultProps = {
  buhlishkoList: [],
};

export default BuhlishkoList;
