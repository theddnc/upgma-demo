import React, { PropTypes } from 'react';
import Header from './Row.Header.jsx';
import Cell from './Cell';
import formatNumber from '../../formatters/formatNumber';

class Row extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    rowId: PropTypes.number.isRequired,
    highlighted: PropTypes.bool,
    highlightedCol: PropTypes.number,
    pairs: PropTypes.arrayOf(PropTypes.object),
    onValueUpdate: PropTypes.func
  };

  isHighlighted(cellId) {
    return this.props.highlighted || this.props.highlightedCol === cellId;
  }

  isMarked(cellId) {
    //todo iterate over pairs
    return false;
  }

  getCellProps(cellId) {
    const isNameCell = (cellId === 0);
    const isPaddingCell = (cellId > this.props.values.length);

    return {
      rowId: this.props.rowId,
      colId: cellId,
      key: cellId,
      highlighted: this.isHighlighted(cellId),
      marked: this.isMarked(cellId),
      editable: !isPaddingCell && !isNameCell && this.props.editable,
      onValueUpdate: this.props.onValueUpdate
    };
  }

  render() {
    const { values, name }  = this.props;
    values.concat()
    return (
      <tr>
        <Cell {...this.getCellProps(0)}>{ name }</Cell>
    {values.map((value, id) => {
      return (
        <Cell {...this.getCellProps(id+1)}>{ formatNumber(value) }</Cell>
      );
    })}
      </tr>
    )
  }
}

Row.Header = Header;

export default Row;