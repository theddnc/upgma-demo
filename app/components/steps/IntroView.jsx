import React, { PropTypes } from 'react';
import Grid from '../grid/Grid';
import { Col, Row, Button } from 'react-bootstrap';

class IntroView extends React.Component {
  static propTypes = {
    gridConfig: PropTypes.object,
    onStepChange: PropTypes.func,
    onGridChange: PropTypes.func
  };

  onNextStep = () => {
    this.props.onStepChange();
  };
  
  render() {
    const { gridConfig } = this.props;

    return (
      <Row>
        <Col md={5}>
          <Row>
            <h3 style={{ float: 'left', display: 'inline', marginTop: -5}}>Krok 0</h3>
            <Button style={{ float: 'right', display: 'inline', marginBottom: 10 }} bsStyle='primary' onClick={ this.onNextStep }>Następny krok</Button>
          </Row>
          <Row>
            <Grid { ...Object.assign({}, gridConfig, { highlightedRows: [], highlightedCols: [] }) } onGridChange={this.props.onGridChange} />
          </Row>
        </Col>
        <Col md={7} >
          <h3>Czym jest UPGMA?</h3>
          <ul>
            <li>
              UPGMA (unweighted pair group method with arithmetic mean)
              to najprostsza metoda grupująca taksony według ogólnego
              podobieństwa lub odległości.
            </li>
            <li>
              Pracuje wyłącznie na matrycach dystansowych np.
              hybrydyzacja DNA-DNA lub konstruowanych z danych
              sekwencyjnych na podstawie ilości substytucji.
            </li>
            <li>
              UPGMA umożliwia określenie długości gałęzi (odlegości
              ewolucyjnej) jak i uporządkowania gałęzi.
            </li>
            <li>
              Zakłada stały zegar molekularny – możliwe jest teoretycznie
              oszacowanie czasu dywergencji na podstawie różnic w
              sekwencjach
            </li>
          </ul>
          <h3>Jak korzystać z tego narzędzia?</h3>
        </Col>
      </Row>
    )
  }
}

export default IntroView;
