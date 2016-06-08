import React, { PropTypes } from 'react';
import Grid from '../grid/Grid';
import Tree from '../tree/Tree';
import reduceGrid from '../../algorithm/reduceGrid';
import makeTree from '../../algorithm/makeTree';
import { Col, PageHeader, Row, Button } from 'react-bootstrap';

class StepView extends React.Component {
  static propTypes = {
    step: PropTypes.number,
    gridConfig: PropTypes.object,
    treeConfig: PropTypes.object,
    onStepChange: PropTypes.func
  };

  onNextStep = () => {
    const { gridConfig, step} = this.props;
    const newGridConfig = reduceGrid(gridConfig, step);
    const newTreeConfig = makeTree(gridConfig, step);

    this.props.onStepChange(newGridConfig, newTreeConfig, step === 4); //todo real flag xD
  };
  
  render() {
    const { gridConfig, treeConfig, step } = this.props;

    return (
      <Row>
        <Col md={5}>
          <Row>
            <h3 style={{ float: 'left', display: 'inline', marginTop: -5}}>{ `Krok ${step}` }</h3>
            <Button style={{ float: 'right', display: 'inline', marginBottom: 10 }} bsStyle='primary' onClick={ this.onNextStep }>Następny krok</Button>
          </Row>
          <Row>
            <Grid { ...gridConfig } />
          </Row>
          <Row>
            <Grid { ...reduceGrid(gridConfig) } />
          </Row>
        </Col>
        <Col md={7}>
          <Tree { ...treeConfig } />
        </Col>
      </Row>
    )
  }
}

export default StepView;
