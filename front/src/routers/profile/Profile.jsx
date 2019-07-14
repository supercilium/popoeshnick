import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withStyles,
  Tab,
  Tabs,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Container } from '../../components';
import { API_CONST } from '../../constants';
import * as alkashActions from '../../__data__/actions/alkashActions';
import Image from './1.jpg';
import { UserInfo } from '../../components/userInfo';

const avatar = {
  float: 'left',
  height: '64px',
  width: '64px',
  backgroundColor: '#ddd',
  borderRadius: '6px',
  lineHeight: '64px',
  textAlign: 'center',
  margin: '0 24px',
};

const styles = ({
  wrapper: {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    height: '100vh',
    paddingTop: '0.83em',
  },
});

export class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  handleChange = (event, value) => this.setState({
    value,
  })

  handleLogout = () => {
    const {
      // eslint-disable-next-line no-shadow
      alkashActions,
    } = this.props;
    axios.get(API_CONST.LOGOUT).then(() => {
      alkashActions.setAlkash({});
    });
  }

  render() {
    const {
      value,
    } = this.state;

    const {
      alkash,
      classes,
    } = this.props;
    const isAuth = !_.isEmpty(alkash);
    return (
      <div>
        <Container
          auth={isAuth}
          handleLogout={this.handleLogout}
        >
          <div className={classes.wrapper}>
            <div style={avatar}>V</div>
            <h2>{alkash.name}</h2>
            <div className={classes.root}>
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Profile" />
                <Tab label="Password" />
              </Tabs>
              {value === 0 && <UserInfo {...alkash} />}
              {value === 1 && <p>тряси</p>}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.any.isRequired,
  alkashActions: PropTypes.any.isRequired,
  alkash: PropTypes.any.isRequired,
};


function mapStateToProps(state) {
  return {
    alkash: state.alkash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alkashActions: bindActionCreators(alkashActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
