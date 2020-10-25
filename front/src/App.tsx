import React, { ReactElement } from 'react'
import { bindActionCreators } from 'redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { axiosInstance } from './utils'
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
  ShareBill,
} from './routers'
import { Layout } from './components'
import { ProtectedRoute } from './components/atoms'
import { ROUT_CONST, API_CONST } from './constants'
import * as alkashActions from './__data__/actions'

const cookies = new Cookies()

// export const App = () => {

// }

class App extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      loader: true,
    }
  }

  componentDidMount() {
    const { setAlkash } = this.props.alkashActions
    this.setState({ loader: true })
    const cookie = cookies.get('session')
    if (cookie) {
      axiosInstance.get(API_CONST.PROFILE).then((res) => {
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
      alkashActions,
    } = this.props
    axiosInstance.get(API_CONST.LOGOUT).then(() => {
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

  getRoutes = ():ReactElement => {
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
          <Route path={`/${ROUT_CONST.SHARE_BILL}`} component={ShareBill} />
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
        handleLogout={this.handleLogout}
      >
        {loader ? <CircularProgress disableShrink /> : this.getRoutes()}
      </Layout>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    alkash: state.alkash,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    alkashActions: bindActionCreators(alkashActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
