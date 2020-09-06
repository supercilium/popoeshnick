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

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
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

Layout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  alkash: PropTypes.object,
  children: PropTypes.element,
  handleLogout: PropTypes.func,
}

Layout.defaultProps = {
  alkash: {},
  children: {},
  handleLogout: () => { },
}

const LoggedInBtns = ({ action }) => (
  <div>
    <Button href="/profile" color="inherit">Profile</Button>
    <Button onClick={action} color="inherit">Logout</Button>
  </div>
)

LoggedInBtns.propTypes = {
  action: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    alkash: state.alkash,
  }
}

export default connect(mapStateToProps)(Layout)
