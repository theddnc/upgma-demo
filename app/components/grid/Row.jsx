import React from 'react';
import Cell from './Cell';
import formatNumber from '../../formatters/formatNumber';

class Row extends React.Component {
  static propTypes = {
    values: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ])).isRequired,
    rowId: React.PropTypes.number.isRequired,
    highlighted: React.PropTypes.bool.isRequired,
    highlightedColId: React.PropTypes.number.isRequired
  };

  isHighlighted(id) {
    return this.props.highlighted || this.props.highlightedColId === id;
  }

  render() {
    const values = this.props.values;
    return (
      <tr>
      {
        values.map((value, id) => {
          return (
            <Cell rowId={ this.props.rowId } colId={ id } key={ id } highlighted={ this.isHighlighted(id) }>
              { typeof value === 'number' ? formatNumber(value) : value}
            </Cell>
          );
        })
      }
      </tr>
    )
  }
}

export default Row;