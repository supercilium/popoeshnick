import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  withStyles,
  Button,
  Theme,
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
import { Styles } from '@material-ui/core/styles/withStyles'
import { UserProfile } from '../../model/user'

const styles: Styles<Theme, {}, string> = {
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

interface Props {
  alkashActions: any;
  classes: any;
  alkash: any;
  dispatch: any;
}

interface State {
  openSignup: boolean;
  openForgot: boolean;
}

export class LoginPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    const { dispatch } = props
    this.actions = bindActionCreators(alkashActions, dispatch)

    this.state = {
      openSignup: false,
      openForgot: false,
    }
  }
  actions: typeof alkashActions

  handleLogin = (profile: UserProfile) => this.actions.setAlkashAction(profile)

  handleSendQuery = (profile: UserProfile) => this.props.alkashActions.setAlkashAction(profile)

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
              open={this.state.openSignup}
              onClose={this.handleCloseSignup}
              onSend={this.handleSendQuery}
            />
            <DialogForgot
              open={this.state.openForgot}
              onClose={this.handleCloseForgot}
            />
          </header>
        )
        : (<Redirect to="/" />)
    )
  }
}

function mapStateToProps(state: any) {
  return {
    alkash: state.alkash,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(LoginPage))
