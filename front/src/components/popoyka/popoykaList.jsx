import React from 'react';
import Popoyka from './popoyka';

class PopoykaList extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { expanded } = this.state;
    const { popoykaList } = this.props;
    return (
      popoykaList.map((item, i) => <Popoyka key={`${item.name}_${i}`} {...item}/>)
    );
  }
}

export default PopoykaList;
