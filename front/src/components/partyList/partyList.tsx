import React, { FC } from 'react'
import {
  Typography,
} from '@material-ui/core'
import { PartyItem } from '../atoms'
import { Party } from '../../model/user'

interface Props {
  data: Party[];
}

export const PartyList: FC<Props> = React.memo(({ data }) => (
  <div>
    <Typography variant="h6" gutterBottom>Your completed popoykas</Typography>
    {data.map(item => <PartyItem key={`${item.dateStart}_${item.location}`} {...item} />)}
  </div>
))
