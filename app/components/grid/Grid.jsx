import React, { PropTypes } from 'react';
import Row from './Row';

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
    editable: PropTypes.bool
  };

  getHeaderRowProps() {
    console.log(['getHeaderRowProps']);
    return {
      names: [''].concat(this.props.names),
      rowId: 0,
      highlightedCol: this.props.highlightedCol,
      key: 0
    };
  }

  getValueRowProps(rowId) {
    if (rowId >= 0 && rowId < this.props.names.length) {
      const props = {
        name: this.props.names[rowId],
        values: this.props.values[rowId],
        rowId: rowId + 1,
        highlighted: (this.props.highlightedRow === rowId + 1),
        highlightedCol: this.props.highlightedCol,
        pairs: this.props.pairs,
        key: rowId + 1
      };
      console.log(['getValueRowProps'], rowId, props);
      return props;
    }
    console.log(['getValueRowProps'], rowId);
    return {};
  }

  render() {
    const { values } = this.props;
    return (
      <table>
        <tbody>
          <Row.Header {...this.getHeaderRowProps()} />
      {values.map((_, id) => {
        return (
          <Row {...this.getValueRowProps(id)} />
        )
      })}
        </tbody>
      </table>
    )
  }
}

export default Grid;
