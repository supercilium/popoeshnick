import React from 'react';
import axios from 'axios';

import { TopMenu } from '../../components';
import { API_CONST } from '../../constants';


export default class Profile extends React.Component {
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
        <h2>Hello Alkash!</h2>
      </div>
    );
  }
};
