import React from 'react';
import { FormControl } from 'react-bootstrap';

class Cell extends React.Component {
  static propTypes = {
    rowId: React.PropTypes.number.isRequired,
    colId: React.PropTypes.number.isRequired,
    highlighted: React.PropTypes.bool,
    highlightedGroups: React.PropTypes.arrayOf(React.PropTypes.object),
    editable: React.PropTypes.bool,
    onValueUpdate: React.PropTypes.func,
    children: React.PropTypes.string
  };

  static GROUP_COLORS = [
    'rgba(120, 7, 173, 1)',
    'rgba(255, 30, 0, 1)',
    'rgba(0, 193, 51, 1)',
    'rgba(248, 254, 0, 1)',
    'rgba(76, 150, 194, 1)'
  ];

  static HIGHLIGHT_COLOR = 'rgba(30, 240, 10, 0.4)';

  static STYLE_DEFAULTS =  {
    minWidth: 60,
    textAlign: 'center'
  };

  state = {
    value: this.props.children
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      value: newProps.children
    });
  }

  getGroupColor() {
    if (!this.props.highlightedGroups) {
      return null;
    }
    for (const group of this.props.highlightedGroups) {
      for (const item of group.coords) {
        if (item.x === this.props.colId && item.y === this.props.rowId) {
          return Cell.GROUP_COLORS[group.id];
        }
      }
    }
    return null;
  }

  getCellStyle() {
    let style = {};
    if (this.props.highlighted) {
      style = Object.assign(style, {
        background: Cell.HIGHLIGHT_COLOR
      });
    }
    if (this.getGroupColor()) {
      style = Object.assign(style, {
        border: `4px solid ${this.getGroupColor()}`
      })
    }
    return Object.assign(style, Cell.STYLE_DEFAULTS);
  }

  onInputChange = (e) => {
    const value = e.target.value;
    const { rowId, colId } = this.props;
    this.props.onValueUpdate(rowId-1, colId-1, Number(value));
  };

  render() {
    return (
      <td style={ this.getCellStyle() }>
      { this.props.editable ? (
        <FormControl type="text" onChange={this.onInputChange} defaultValue={ this.state.value } style={{maxWidth: 65}}/>
      ) : (
        this.state.value
      )}
      </td>
    )
  }
}

export default Cell;
