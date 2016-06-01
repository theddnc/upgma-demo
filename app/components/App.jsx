import React from 'react';
import { defaultTableConfig } from '../config';
import Grid from './grid/Grid';
import { Col, PageHeader, Row }  from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <div style={{margin: '50px'}}>
        <PageHeader marginBottom={50}>upgma-demo</PageHeader>
        <Row>
          <Col md={5}>
            <Grid { ...defaultTableConfig } />
          </Col>
          <Col md={7}>
          </Col>
        </Row>
      </div>
    )
  }
}

export default App;
