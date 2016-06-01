import React from 'react';
import { Input } from 'react-bootstrap';

class Cell extends React.Component {
  static propTypes = {
    rowId: React.PropTypes.number.isRequired,
    colId: React.PropTypes.number.isRequired,
    highlighted: React.PropTypes.bool,
    editable: React.PropTypes.bool,
    onValueUpdate: React.PropTypes.function,
    children: React.PropTypes.string
  };

  state = {
    value: this.props.children
  };

  getCellStyle() {
    if (this.props.highlighted) {
      return {
        background: 'yellow'
      }
    }
    return {}
  }

  onInputChange = () => {
    const value = this.refs.cellValue.value;
    const { rowId, colId } = this.props;
    this.props.onValueUpdate(rowId, colId, value);
  };

  render() {
    return (
      <td style={this.getCellStyle()}>
      { this.props.editable ? (
        <Input type="text" onChange={this.onInputChange} defaultValue={ this.state.value } ref="cellValue"/>
      ) : (
        this.state.value
      )}
      </td>
    )
  }
}

export default Cell;
