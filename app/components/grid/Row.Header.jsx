import React, { PropTypes } from 'react';
import Cell from './Cell';
import formatNumber from '../../formatters/formatNumber';

class Header extends React.Component {
  static propTypes = {
    names: PropTypes.arrayOf(PropTypes.string),
    rowId: PropTypes.number.isRequired,
    highlightedCol: PropTypes.number
  };

  isHighlighted(cellId) {
    return this.props.highlightedCol === cellId;
  }
  
  getCellProps(cellId) {
    return {
      rowId: this.props.rowId,
      colId: cellId,
      key: cellId,
      highlighted: this.isHighlighted(cellId),
      editable: false
    }
  }

  render() {
    const { names }  = this.props;
    return (
      <tr>
        <Cell {...this.getCellProps(0)} />
    {names.map((name, id) => {
      return (
        <Cell {...this.getCellProps(id+1)}>{ name }</Cell>
      );
    })}
      </tr>
    )
  }
}

export default Header;