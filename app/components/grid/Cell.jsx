import React from 'react';
import { FormControl } from 'react-bootstrap';

class Cell extends React.Component {
  static propTypes = {
    rowId: React.PropTypes.number.isRequired,
    colId: React.PropTypes.number.isRequired,
    highlighted: React.PropTypes.bool,
    editable: React.PropTypes.bool,
    onValueUpdate: React.PropTypes.func,
    children: React.PropTypes.string
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      value: newProps.children
    });
  }

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

  onInputChange = (e) => {
    const value = e.target.value;
    const { rowId, colId } = this.props;
    this.props.onValueUpdate(rowId-1, colId-1, value);
  };

  render() {
    return (
      <td style={ Object.assign(this.getCellStyle(), { maxWidth: 25, textAlign: 'center' })}>
      { this.props.editable ? (
        <FormControl type="text" onChange={this.onInputChange} defaultValue={ this.state.value }/>
      ) : (
        this.state.value
      )}
      </td>
    )
  }
}

export default Cell;
