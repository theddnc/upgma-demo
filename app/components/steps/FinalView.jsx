import React, { PropTypes } from 'react';
import Grid from '../grid/Grid';
import Tree from '../tree/Tree';
import { Col, PageHeader, Row, Button } from 'react-bootstrap';

class FinalView extends React.Component {
  static propTypes = {
    history: PropTypes.arrayOf(PropTypes.object),
    onStepChange: PropTypes.func,
    treeConfig: PropTypes.object
  };

  onNextStep = () => {
    this.props.onStepChange();
  };

  static clearGridColors(grid) {
    return Object.assign({}, grid, {
      highlightedCols: [],
      highlightedRows: [],
      highlightedGroups: [],
      editable: false
    });
  }
  
  render() {
    const { history, treeConfig } = this.props;

    return (
      <Row>
        <Col md={5}>
        <Row>
          <h3 style={{ float: 'left', display: 'inline', marginTop: -5}}>Podsumowanie</h3>
          <Button style={{ float: 'right', display: 'inline', marginBottom: 10 }} bsStyle='success' onClick={ this.onNextStep }>Od początku</Button>
        </Row>
      {history.map((gridConfig, idx) => {
        return (
          <Row key={idx}>
            <h4>{`Krok ${idx}`}</h4>
            <Grid {...FinalView.clearGridColors(gridConfig)} key={idx} />
          </Row>
        );
      })}
          <Row>
            <Button style={{ float: 'right'}} bsStyle='success' onClick={ this.onNextStep }>Od początku</Button>
          </Row>
        </Col>
        <Col md={7}>
          <Tree {...treeConfig} />
        </Col>
      </Row>
    )
  }
}

export default FinalView;
