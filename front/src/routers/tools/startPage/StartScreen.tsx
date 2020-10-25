import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import {
  CircularProgress,
} from '@material-ui/core'

import * as alkashActions from '../../../__data__/actions/alkashActions'
import { API_CONST } from '../../../constants'

import {
  Home,
} from '../../../components'

interface Props {
  actions: any;
  alkash: any;
}

interface State {
  loader: boolean;
}

export class StartScreen extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      loader: false,
    }
  }

  handleLogout = () => {
    const {
      actions,
    } = this.props
    axios.get(API_CONST.LOGOUT).then(() => {
      this.setState({
        loader: true,
      })
    }).then(() => {
      this.setState({
        loader: false,
      })
      actions.setAlkash({})
    })
  }

  render() {
    const {
      loader,
    } = this.state
    const {
      alkash,
    } = this.props
    return (
      loader ? <CircularProgress /> : <Home {...alkash} />
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
    actions: bindActionCreators(alkashActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen)
