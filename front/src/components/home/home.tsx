import React from 'react'
import {
  Grid,
  Typography,
  Button,
} from '@material-ui/core'
import { PartyList } from '../partyList'
import { UserCard } from '../atoms'
import { useStyles } from './styles'

interface PropsHome {
  name: string;
  email: string;
  lygrylity: number;
  popoykaList: any[];
}

export const Home = React.memo(({
  name,
  email,
  popoykaList,
  lygrylity,
}: PropsHome) => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <div className={classes.leftWrapper}>
        <Grid container xs={12} spacing={10}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              classes={{ root: classes.typographyRoot }}
              gutterBottom
            >
              Hello Alkash!
            <Button
                variant="contained"
                color="primary"
                classes={{ root: classes.btnRoot }}
              >
                Start New Popoyka
            </Button>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <UserCard {...{ name, email, lygrylity }} />
          </Grid>
          <Grid item xs={6}>
            <UserCard {...{ name: 'Team Score', email: 'placeholder', lygrylity: 25 }} />
          </Grid>
        </Grid>
      </div>
      <div className={classes.rightWrapper}>
        <PartyList data={popoykaList} />
      </div>
    </div>
  )
})
