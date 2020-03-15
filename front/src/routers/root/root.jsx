import React from 'react'
import {
  Paper,
  makeStyles,
  Link,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  header: {
    textAlign: 'center',
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(26),
      height: theme.spacing(26),
    },
    '& a': {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}))

export const Root = () => {
  const classes = useStyles()
  return (
    <header className={classes.header}>
      <h1>PoPoTools</h1>
      <div className={classes.root}>
        <Paper elevation={3}><Link href="/">Share Bill</Link></Paper>
        <Paper elevation={3}><Link href="/">Theme Counter</Link></Paper>
        <Paper elevation={3}><Link href="/">Statistics</Link></Paper>
        <Paper elevation={3}><Link href="/">Popo Assistent</Link></Paper>
      </div>
    </header>
  )
}

export default Root
