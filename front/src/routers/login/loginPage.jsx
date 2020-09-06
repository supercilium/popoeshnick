/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  withStyles,
  Button,
} from '@material-ui/core'
import {
  Redirect,
} from 'react-router-dom'
import _ from 'lodash'
import {
  LoginForm,
  DialogSignup,
  DialogForgot,
} from '../../components'
import * as alkashActions from '../../__data__/actions/alkashActions'

const styles = {
  appHeader: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(223, 17, 17)',
    minHeight: '100vh',
  },
  button: {
    marginTop: '15px',
    marginBottom: '15px',
  },
}

export class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props)

    const { dispatch } = props
    this.actions = bindActionCreators(alkashActions, dispatch)

    this.state = {
      openSignup: false,
      openForgot: false,
    }
  }

  // eslint-disable-next-line react/destructuring-assignment
  handleLogin = profile => this.actions.setAlkash(profile)

  // eslint-disable-next-line react/destructuring-assignment
  handleSendQuery = profile => this.props.alkashActions.setAlkash(profile)

  handleCloseSignup = () => this.setState({ openSignup: false })

  handleOpenSignup = () => this.setState({ openSignup: true })

  handleCloseForgot = () => this.setState({ openForgot: false })

  handleOpenForgot = () => this.setState({ openForgot: true })

  render() {
    const {
      classes,
      alkash,
    } = this.props
    return (
      _.isEmpty(alkash)
        ? (
          <header className={classes.appHeader}>
            <LoginForm
              onLogin={this.handleLogin}
            />
            <Button classes={{ root: classes.button }} onClick={this.handleOpenForgot}>
              Forgot password?
            </Button>
            <Button onClick={this.handleOpenSignup}>
              Registration
            </Button>
            <DialogSignup
              // eslint-disable-next-line react/destructuring-assignment
              open={this.state.openSignup}
              onClose={this.handleCloseSignup}
              onSend={this.handleSendQuery}
            />
            <DialogForgot
              // eslint-disable-next-line react/destructuring-assignment
              open={this.state.openForgot}
              onClose={this.handleCloseForgot}
            />
          </header>
        )
        : (<Redirect to="/" />)
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  alkashActions: PropTypes.object.isRequired,
  alkash: PropTypes.any.isRequired,
  dispatch: PropTypes.any.isRequired,
}

function mapStateToProps(state) {
  return {
    alkash: state.alkash,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(LoginPage))
