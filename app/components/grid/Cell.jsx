import React from 'react';

class Cell extends React.Component {
  static propTypes = {
    rowId: React.PropTypes.number.isRequired,
    colId: React.PropTypes.number.isRequired,
    highlighted: React.PropTypes.bool,
    children: React.PropTypes.element,
    editable: React.PropTypes.bool
  };

  render() {
    return (
      <td>
      { this.props.highlighted ? (
        <span style={{color: 'red', background: 'yellow'}}>{ this.props.children }</span>
      ) : (
        this.props.children
      ) }
      </td>
    )
  }
}

export default Cell;
