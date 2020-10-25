import React, { FC } from 'react'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { BuhlishkoList } from '../../buhlishkoList'
import { Party } from '../../../model/user'

const useStyles = makeStyles(() => ({
  root: {
    flexDirection: 'row',
  },
  /* Styles applied to the children wrapper element. */
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  directionColumn: {
    flexDirection: 'column',
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
    marginLeft: '8px',
  },
  innerFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // iconGroup: {
  //   width: '48px',
  //   height: '48px',
  //   backgroundColor: '#ddd',
  //   lineHeight: '48px',
  // },
}))

export const PartyItem: FC<Party> = ({
  buhlishkoList,
  dateStart,
  dateEnd,
  location,
  budget,
  mode,
  lygrylity,
  note,
}) => {
  const { amount, currency } = budget
  const startDate = new Date(dateStart)
  const endDate = new Date(dateEnd)
  const period = 12
  const classes = useStyles({})
  // TODO calc dates
  // const period = (endDate - startDate) / 3600000
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary classes={{ root: classes.root, content: classes.content }}>
          <div className={classes.innerFlex}>
            {/* <div className={classes.iconGroup}>icon</div> */}
            <div className={classes.textLeft}>
              <Typography variant="subtitle1">{`${mode} mode ${location} popoyka`}</Typography>
              <Typography variant="caption">{`started: ${startDate.toDateString()} at ${startDate.getHours()}:${startDate.getMinutes()} lasts: ${period} hrs`}</Typography>
            </div>
          </div>
          <div>
            <Typography variant="button" className={classes.textRight}>{`+ ${lygrylity}lg`}</Typography>
            <Typography variant="button" className={classes.textRight}>{`- ${amount} ${currency}`}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.directionColumn }}>
          <Typography variant="subtitle1">Buhlishko List</Typography>
          <BuhlishkoList data={buhlishkoList} />
          <Typography variant="body1">{`note: ${note}`}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}