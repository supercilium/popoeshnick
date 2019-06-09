import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core';
import { TopMenu } from '../../components';
import { API_CONST } from '../../constants';
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
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
    };
  }

  handleLogout = () => {
    axios.get(API_CONST.LOGOUT).then(() => {
      this.setState({
        auth: false,
      });
    });
  }

  render() {
    const { auth } = this.state;
    return (
      <div>
        <TopMenu
          auth={auth}
          onLogout={this.handleLogout}
        />
        <div className={this.props.classes.wrapper}>
          <h2>Hello Alkash!</h2>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(Profile);
