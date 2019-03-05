import React from 'react';
import Popoyka from './popoyka';

const PopoykaList = ({ data }) => (
  data.map(item => <Popoyka key={`${item.dateStart}_${item.location}`} {...item} />)
);

export default PopoykaList;
