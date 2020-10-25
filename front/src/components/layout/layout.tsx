import React, { FC, ReactNode } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  AppBar,
  Toolbar,
  makeStyles,
  Button,
} from '@material-ui/core'
import _ from 'lodash'

import { Footer } from '../atoms'
import { UserProfile } from '../../model/user'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  grow: {
    justifyContent: 'space-between',
  },
}))

interface Props {
  alkash: UserProfile;
  handleLogout: () => void;
  children: ReactNode;
}

export const Layout: FC<Props> = ({ alkash, handleLogout, children }) => {
  const classes = useStyles()
  const isAuth = !_.isEmpty(alkash)
  return (
    <Container
      maxWidth={false}
      className={classes.root}
      disableGutters
    >
      <AppBar
        position="static"
      >
        <Toolbar
          className={classes.grow}
        >
          <Button href="/" color="inherit">Popoeshnick.club</Button>
          {!isAuth
            ? <Button href="/login" color="inherit">Login</Button>
            : <LoggedInBtns action={handleLogout} />
          }
        </Toolbar>
      </AppBar>
      {children}
      <Footer />
    </Container>
  )
}

const LoggedInBtns: FC<any> = ({ action }) => (
  <div>
    <Button href="/profile" color="inherit">Profile</Button>
    <Button onClick={action} color="inherit">Logout</Button>
  </div>
)

function mapStateToProps(state: any) {
  return {
    alkash: state.alkash,
  }
}

export default connect(mapStateToProps)(Layout)
