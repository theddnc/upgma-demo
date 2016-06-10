import React, { PropTypes } from 'react';
import Grid from '../grid/Grid';
import Tree from '../tree/Tree';
import Equation from '../equation/Equation';
import { Col, PageHeader, Row, Button } from 'react-bootstrap';

class StepView extends React.Component {
  static propTypes = {
    step: PropTypes.number,
    gridConfig: PropTypes.object,
    reducedGridConfig: PropTypes.object,
    treeConfig: PropTypes.object,
    onStepChange: PropTypes.func
  };

  onNextStep = () => {
    this.props.onStepChange();
  };
  
  render() {
    const { gridConfig, reducedGridConfig, treeConfig, step } = this.props;

    return (
      <Row>
        <Col md={5}>
          <Row>
            <h3 style={{ float: 'left', display: 'inline', marginTop: -5}}>{ `Krok ${step}` }</h3>
            <Button style={{ float: 'right', display: 'inline', marginBottom: 10 }} bsStyle='primary' onClick={ this.onNextStep }>Następny krok</Button>
          </Row>
          <Row>
            <Grid { ...Object.assign({}, gridConfig, { editable: false }) } />
          </Row>
          <Row>
        {gridConfig.highlightedGroups.map((item, idx) => {
          return (
            <Equation group={item} key={idx}/>
          )}
        )}
          </Row>
          <Row>
            <Grid { ...reducedGridConfig } />
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
