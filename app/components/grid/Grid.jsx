import React from 'react';
import Row from './Row';

class Grid extends React.Component {
  static propTypes = {
    config: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]))
    )
  };

  render() {
    const config = this.props.config;
    const highlightedCol = 2;
    const highlightedRow = 4;

    return (
      <table>
        <tbody>
          {
            config.map((row, id) => {
              return <Row values={ row } key={ id } rowId={ id }
                          highlighted={ highlightedRow === id }
                          highlightedColId={ highlightedCol }/>
            })
          }
        </tbody>
      </table>
    )
  }
}

export default Grid;
