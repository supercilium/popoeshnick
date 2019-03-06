import React from 'react';
import PropTypes from 'prop-types';
import Buhlishko from './buhlishko';

export const BuhlishkoList = ({ data }) => (
  <div style={{ marginBottom: '10px ' }}>
    {data.map(item => <Buhlishko key={`${item.name}_${item.amount}_${item.lg}`} {...item} />)}
  </div>
);

BuhlishkoList.propTypes = {
  data: PropTypes.array,
};

BuhlishkoList.defaultProps = {
  data: [],
};

export default BuhlishkoList;
