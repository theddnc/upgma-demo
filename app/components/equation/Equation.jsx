import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';
import { GROUP_COLORS } from '../../constants';
import formatNumber from '../../formatters/formatNumber';


class Equation extends React.Component {
  static propTypes = {
    group: PropTypes.object
  };

  makeEquation() {
    const { group } = this.props;
    const sum = group.coords.reduce((sum, item) => {
      return `${formatNumber(item.value)} + ${sum}`
    }, '').slice(0, -3);
    return `(${sum}) ÷ ${group.coords.length} = ${formatNumber(group.value)}`;
  }

  getStyle() {
    return {
      color: GROUP_COLORS[this.props.group.id % GROUP_COLORS.length],
      fontWeight: 900,
      fontSize: 20,
      marginBottom: 15,
      textAlign: 'right'
    }
  }

  render() {
    return (
      <div style={this.getStyle()}>{ this.makeEquation() }</div>
    )
  }
}

export default Equation;
