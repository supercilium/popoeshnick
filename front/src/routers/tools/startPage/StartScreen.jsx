/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {
  CircularProgress,
} from '@material-ui/core'

import * as alkashActions from '../../../__data__/actions/alkashActions'
import { API_CONST } from '../../../constants'

import {
  Home,
} from '../../../components'

export class StartScreen extends PureComponent {
  constructor(props) {
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

StartScreen.propTypes = {
  classes: PropTypes.any.isRequired,
  actions: PropTypes.any.isRequired,
  alkash: PropTypes.any.isRequired,
}

function mapStateToProps(state) {
  return {
    alkash: state.alkash,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(alkashActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen)
