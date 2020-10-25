import React, { PureComponent } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  CircularProgress,
  withStyles,
} from '@material-ui/core'
import _ from 'lodash'
import { API_CONST } from '../../constants'

import './dialog.css'
import { validateEmail, validatePass, axiosInstance } from '../../utils'

const styles = ({
  button: {
    marginTop: '20px',
  },
})
export class DialogSignup extends PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      loading: false,
      email: null,
      password: null,
      passwordIdentity: null,
      errors: {
        email: [],
        password: [],
        registration: '',
        passwordIdentity: '',
      },
    }
  }

  handleOnExited = () => {
    this.setState({
      errors: {
        email: [],
        password: [],
        registration: '',
        passwordIdentity: '',
      },
    })
  }

  handleSetPassword = (event: any) => {
    const errMsg = ['must contain at list 8 charecters']
    this.setState({
      password: event.target.value,
      errors: {
        password: validatePass(event.target.value) ? [] : errMsg,
      },
    })
  }

  handleSetEmail = (event: any) => {
    const errMsg = ['invailid email address']
    this.setState({
      email: event.target.value,
      errors: {
        email: validateEmail(event.target.value) ? [] : errMsg,
      },
    })
  }

  handleVerifyPassword = (event: any) => {
    const { password } = this.state
    if (event.target.value === password) {
      this.setState({
        errors: { passwordIdentity: 'does not match' },
        passwordIdentity: true,
      })
    } else {
      this.setState({
        errors: { passwordIdentity: 'does not match' },
        passwordIdentity: false,
      })
    }
  }

  handleSignup = () => {
    const { password, email } = this.state
    this.setState({ loading: true })
    const { onSend } = this.props
    axiosInstance.post(API_CONST.REGISTER, {
      password,
      email,
    }).then((res) => {
      const { errors, profile, status } = res.data
      if (status === 'success') {
        onSend(profile || {})
      } else {
        this.setState({
          errors: {
            registration: errors.registration,
            email: errors.email,
            password: errors.password,
          },
        })
      }
    }).catch(async (error) => {
      if (error.response) {
        this.setState({ errors: { registration: error.response.data } })
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // this.setState({ error: error.request })
      } else {
        // Something happened in setting up the request that triggered an Error
        // this.setState({ error: error.message })
      }
    })
    this.setState({ loading: false })
  }

  handleSubmit = (e: any) => {
    const {
      errors,
    } = this.state
    const passError = !_.isEmpty(errors.password)
    const emailError = !_.isEmpty(errors.email)
    if (!emailError && !passError) {
      this.handleSignup()
    }
    e.preventDefault()
  }

  render() {
    const { open, onClose, classes } = this.props
    const {
      loading,
      errors,
      email,
      password,
      passwordIdentity,
    } = this.state
    const passError = !_.isEmpty(errors.password)
    const emailError = !_.isEmpty(errors.email)
    return (
      <Dialog
        open={open}
        onClose={onClose}
        onExited={this.handleOnExited}
      >
        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
          {loading && <CircularProgress />}
          {
            errors.registration
              ? <div>{errors.registration}</div>
              : (
                <form className="dialog-style" onSubmit={this.handleSubmit}>
                  <TextField
                    label="Enter email"
                    margin="normal"
                    onChange={this.handleSetEmail}
                    error={emailError}
                    helperText={emailError && errors.email}
                  />
                  <TextField
                    label="Enter password"
                    margin="normal"
                    type="password"
                    onChange={this.handleSetPassword}
                    error={passError}
                    helperText={passError && errors.password}
                  />
                  <TextField
                    label="Verify password"
                    margin="normal"
                    type="password"
                    onChange={this.handleVerifyPassword}
                    error={password && !passwordIdentity}
                    helperText={password && !passwordIdentity && errors.passwordIdentity}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.button }}
                    type="submit"
                    disabled={!email || !password || !passwordIdentity || (passError || emailError)}
                  >
                    Sign Up
                  </Button>
                </form>
              )
          }
        </DialogContent>
      </Dialog>
    )
  }
}

export default withStyles(styles)(DialogSignup)
