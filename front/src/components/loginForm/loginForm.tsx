import React, { FC } from 'react'
import {
  TextField,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core'
import red from '@material-ui/core/colors/red'
import axios from 'axios'
import { Formik } from 'formik'

import { validatePass } from '../../utils'
import { API_CONST } from '../../constants'
import { UserLoginInfo, UserProfile } from '../../model/user'

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    marginTop: '20px',
  },
  subtitle: {
    marginTop: '10px',
  },
  img: {
    backgroundImage: `url(${Image})`,
    width: '260px',
    height: '193px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
  error: {
    color: red[500],
  },
  input: {
    width: '260px',
  },
  button: {
    marginTop: '10px',
  },
}))

interface Props {
  onLogin: (value: UserProfile) => void;
}

export const LoginForm: FC<Props> = ({ onLogin }) => {
  const classes = useStyles({})
  const handleLogin = (values: Partial<UserLoginInfo>, setErrors: (errors: Partial<UserLoginInfo>) => void) => {
    axios.post(API_CONST.LOGIN, {
      password: values.password,
      email: values.email,
    }).then((res) => {
      const { errors, profile, status } = res.data
      if (status === 'success') {
        onLogin(profile)
      } else {
        const errorObj = {
          email: errors?.email?.reduce((acc: string, str: string) => `${str} ${acc}`, ''),
          password: errors?.password?.reduce((acc: string, str: string) => `${str} ${acc}`, '')
        }
        setErrors(errorObj)
      }
    }).catch((error) => {
      // TODO Form error
      console.log(error)
    })
  }

    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values: Partial<UserLoginInfo>) => {
          // TODO move to utils
          const errors: Partial<UserLoginInfo> = {}
          if (!values.email) {
            errors.email = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address'
          }
          if (!values.password) {
            errors.password = 'Required'
          } else if (!validatePass(values.password)) {
            errors.password = 'Password must be at least 8 characters long'
          }
          return errors
        }}
        onSubmit = { async (values, { setSubmitting, setErrors }) => {
          handleLogin(values, setErrors)
          setSubmitting(false)
        }}
      >
        {({
         values,
         errors,
         handleChange,
         handleSubmit,
         isSubmitting,
       }) => (
          <form
            id="loginForm"
            onSubmit={handleSubmit}
            className={classes.form}
          >
            <Typography component="h1" variant="h4" classes={{ root: classes.title }}>
              Hello, Alkash!!!
            </Typography>
            <Typography component="h2" variant="subtitle1" classes={{ root: classes.subtitle }}>
              Explore alco-possibilities with new awesome service Popoeshnick
            </Typography>
            <TextField
              required
              label="email"
              margin="dense"
              type="email"
              name="email"
              className={classes.input}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoComplete="username"
            />
            <TextField
              required
              label="password"
              margin="dense"
              type="password"
              name="password"
              className={classes.input}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              classes={{ root: classes.button }}
              disabled={!values.email || !values.password || isSubmitting}
            >
              Log in
            </Button>
          </form>
       )}
      </Formik>
    )
}