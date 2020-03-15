import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Container,
  AppBar,
  Toolbar,
  makeStyles,
  Button,
} from '@material-ui/core'
import _ from 'lodash'

import Footer from '../footer'

const useStyles = makeStyles(theme => ({
  grow: {
    justifyContent: 'space-between',
  },
}))

export const Layout = ({ alkash, children, handleLogout }) => {
  const classes = useStyles()
  const isAuth = !_.isEmpty(alkash)
  return (
    <Container
      maxWidth={false}
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

const LoggedInBtns = ({ action }) => (
  <div>
    <Button href="/profile" color="inherit">Profile</Button>
    <Button onClick={action} color="inherit">Logout</Button>
  </div>
)

Layout.propTypes = {
  alkash: PropTypes.object,
  children: PropTypes.element,
  handleLogout: PropTypes.func,
}

Layout.defaultProps = {
  alkash: {},
  children: {},
  handleLogout: () => { },
}

function mapStateToProps(state) {
  return {
    alkash: state.alkash,
  }
}

export default connect(mapStateToProps)(Layout)
