import React from 'react';
import PropTypes from 'prop-types';
import Buhlishko from './buhlishko';

export const BuhlishkoList = ({ data }) => data.map(item => <Buhlishko key={`${item.name}_${item.amount}_${item.lg}`} {...item} />);

BuhlishkoList.propTypes = {
  data: PropTypes.array,
};

BuhlishkoList.defaultProps = {
  data: [],
};

export default BuhlishkoList;
