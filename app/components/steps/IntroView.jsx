import React, { PropTypes } from 'react';
import Grid from '../grid/Grid';
import reduceGrid from '../../algorithm/reduceGrid';
import makeTree from '../../algorithm/makeTree';
import { Col, Row, Button } from 'react-bootstrap';

class IntroView extends React.Component {
  static propTypes = {
    gridConfig: PropTypes.object,
    onStepChange: PropTypes.func,
    onGridChange: PropTypes.func
  };

  onNextStep = () => {
    const newGridConfig = reduceGrid(this.props.gridConfig);
    const newTreeConfig = makeTree(this.props.gridConfig);

    this.props.onStepChange(newGridConfig, newTreeConfig);
  };
  
  render() {
    const { gridConfig } = this.props;

    return (
      <Row>
        <Col md={5}>
          <Row><h1>Krok 0</h1></Row>
          <Row>
            <Grid { ...gridConfig } onGridChange={this.props.onGridChange} />
          </Row>
          <Row>
            <Button style={{ float: 'right'}} bsStyle='primary' onClick={ this.onNextStep }>Następny krok</Button>
          </Row>
        </Col>
        <Col md={7} />
      </Row>
    )
  }
}

export default IntroView;
