import React from 'react';
import { PopoykaList } from '../popoyka';

export default (props) => {
  const { popoykaList } = props;
  return (
    <div>
      <h2>Hello Alkash!</h2>
      <PopoykaList {...props} />
    </div>
  );
};
