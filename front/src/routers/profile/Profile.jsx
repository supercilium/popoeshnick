import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Layout } from '../../components';
import { API_CONST } from '../../constants';
import * as alkashActions from '../../__data__/actions/alkashActions';
import Image from './1.jpg';

const styles = ({
  wrapper: {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    height: '100vh',
    paddingTop: '0.83em',
  },
});

export class Profile extends React.PureComponent {
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
      alkash,
      classes,
    } = this.props;
    const isAuth = !_.isEmpty(alkash);
    return (
      <div>
        <Layout
          auth={isAuth}
          handleLogout={this.handleLogout}
        >
          <div className={classes.wrapper}>
            <h2>Hello Alkash!</h2>
          </div>
        </Layout>
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
