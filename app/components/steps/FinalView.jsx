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
  
  render() {
    const { history, treeConfig } = this.props;

    return (
      <Row>
        <Col md={5}>
        <Row>
          <h3 style={{ float: 'left', display: 'inline', marginTop: -5}}>Podsumowanie</h3>
        </Row>
      {history.map((gridConfig, idx) => {
        return (
          <Row>
            <h4>{`Krok ${idx}`}</h4>
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
