import React, { PropTypes } from 'react';
import Row from './Row';
import { Table } from 'react-bootstrap';

//todo use state to pass values to and from rows and cells

class Grid extends React.Component {
  static propTypes = {
    names: PropTypes.arrayOf(PropTypes.string),
    values: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number)
    ),
    highlightedRow: PropTypes.number,
    highlightedCol: PropTypes.number,
    highlightedPairs: PropTypes.arrayOf(PropTypes.object),
    editable: PropTypes.bool,
    onGridChange: PropTypes.func
  };

  state = {
    names: this.props.names,
    values: this.props.values
  };

  getHeaderRowProps() {
    return {
      names: this.props.names,
      rowId: 0,
      highlightedCol: this.props.highlightedCol,
      key: 0
    };
  }

  getValueRowProps(rowId) {
    if (rowId >= 0 && rowId < this.props.names.length) {
      return {
        name: this.state.names[rowId],
        values: this.state.values[rowId],
        rowId: rowId + 1,
        highlighted: (this.props.highlightedRow === rowId + 1),
        highlightedCol: this.props.highlightedCol,
        pairs: this.props.pairs,
        key: rowId + 1,
        onValueUpdate: this.onValueUpdate,
        editable: this.props.editable
      };
    }
    return {};
  }

  onValueUpdate = (rowId, colId, value) => {
    let values = this.state.values;
    values[rowId][colId] = value;
    this.setState({
      values
    });
    this.props.onGridChange && this.props.onGridChange(values);
  };

  render() {
    const { values } = this.props;
    return (
      <Table bordered condensed hover>
        <thead>
          <Row.Header {...this.getHeaderRowProps()} />
        </thead>
        <tbody>
      {values.map((_, id) => {
        return (
          <Row {...this.getValueRowProps(id)} />
        )
      })}
        </tbody>
      </Table>
    )
  }
}

export default Grid;
