/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Cookies from 'universal-cookie'
import _ from 'lodash'
import {
  CircularProgress,
} from '@material-ui/core'

import {
  Root,
  LoginPage,
  StartScreen,
  Profile,
} from './routers'
import { Layout } from './components'
import { ROUT_CONST, API_CONST } from './constants'
import alkashActions from './__data__/actions'


const cookies = new Cookies()

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loader: true,
    }
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { setAlkash } = this.props.alkashActions
    this.setState({ loader: true })
    const cookie = cookies.get('session')
    if (cookie) {
      axios.get(API_CONST.PROFILE).then((res) => {
        const { errors, profile, status } = res.data
        if (status === 'success') {
          setAlkash(profile)
        } else {
          console.log(errors)
        }
      }).catch((error) => {
        console.log(error)
      }).then(() => this.setState({ loader: false }))
    } else {
      this.setState({ loader: false })
    }
  }

  handleLogout = () => {
    const {
      // eslint-disable-next-line no-shadow
      alkashActions,
    } = this.props
    axios.get(API_CONST.LOGOUT).then(() => {
      this.setState({
        loader: true,
      })
    }).then(() => {
      this.setState({
        loader: false,
      })
      alkashActions.setAlkash({})
    })
  }

  getRoutes = () => {
    const {
      alkash,
    } = this.props
    // TODO do redirect to LoginPage then not auth
    // like this example https://stackoverflow.com/questions/48497510/simple-conditional-routing-in-reactjs
    const isAuth = !_.isEmpty(alkash)
    return (
      <Router>
        <Switch>
          <Route path="/" component={Root} exact />
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute path={`/${ROUT_CONST.PROFILE_PAGE}`} auth={isAuth} component={Profile} />
          <ProtectedRoute path="/protected" auth={isAuth} component={StartScreen} />
        </Switch>
      </Router>
    )
  }

  render() {
    const {
      loader,
    } = this.state
    return (
      <Layout
        // eslint-disable-next-line react/destructuring-assignment
        auth={!_.isEmpty(this.props.alkash)}
        handleLogout={this.handleLogout}
      >
        {loader ? <CircularProgress disableShrink /> : this.getRoutes()}
      </Layout>
    )
  }
}

const ProtectedRoute = ({ component: Component, auth, ...tail }) => (
  <Route
    {...tail}
    render={props => (
      auth
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
)


ProtectedRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired,
  auth: PropTypes.bool.isRequired,
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  alkash: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  alkashActions: PropTypes.object.isRequired,
}

App.defaultProps = {
  alkash: {},
}

function mapStateToProps(state) {
  return {
    alkash: state.alkash,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    alkashActions: bindActionCreators(alkashActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
