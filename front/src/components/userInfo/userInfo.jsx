import * as React from 'react';
import {
  TextField,
} from '@material-ui/core';

export const UserInfo = (props) => {
  const {
    name,
    email,
    rank,
    lygrylity,
  } = props;

  return (
    <div>
      <TextField value={name} label="First name" />
      <TextField value={rank} label="rank" />
      <TextField value={lygrylity} label="lygrylity" />
      <TextField value={email} label="Email" disabled={true} />
    </div>
  )
};
