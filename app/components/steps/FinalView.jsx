import React, { PropTypes } from 'react';
import Grid from '../grid/Grid';
import Tree from '../tree/Tree';
import reduceGrid from '../../algorithm/reduceGrid';
import makeTree from '../../algorithm/makeTree';
import { Col, PageHeader, Row, Button } from 'react-bootstrap';

class FinalView extends React.Component {
  static propTypes = {
    history: PropTypes.arrayOf(PropTypes.object),
    onStepChange: PropTypes.func,
    treeConfig: PropTypes.object
  };

  onNextStep = () => {
    const newGridConfig = reduceGrid(this.props.gridConfig);
    const newTreeConfig = makeTree(this.props.gridConfig);

    this.props.onStepChange(newGridConfig, newTreeConfig);
  };
  
  render() {
    const { history, treeConfig } = this.props;

    return (
      <Row>
        <Col md={5}>
        <Row><h1>Podsumowanie</h1></Row>
      {history.map((gridConfig, idx) => {
        return (
          <Row>
            <h3>{`Krok ${idx}`}</h3>
            <Grid {...gridConfig} key={idx} />
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
