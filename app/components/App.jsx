import React from 'react';
import StepView from './steps/StepView'
import { defaultTableConfig } from '../config';
import IntroView from './steps/IntroView';
import FinalView from './steps/FinalView';
import { Col, PageHeader, Row } from 'react-bootstrap';

class App extends React.Component {
  state = {
    step: 0,
    currentGridConfig: defaultTableConfig,
    history: [],
    currentTree: {}
  };

  getIntroViewProps() {
    return {
      onStepChange: this.onStepChange,
      gridConfig: this.state.currentGridConfig
    };
  }

  getFinalViewProps() {
    return {
      onStepChange: this.onStepChange,
      history: this.state.history,
      treeConfig: this.state.currentTree
    };
  }

  getStepViewProps() {
    return {
      onStepChange: this.onStepChange,
      step: this.state.step,
      gridConfig: this.state.currentGridConfig,
      treeConfig: this.state.currentTree
    }
  }

  getNextStep(isFinalStep) {
    if (isFinalStep) {
      return 'final';
    }
    if (this.state.step === 'final') {
      return 0;
    }
    return this.state.step + 1;
  }
  
  onStepChange = (newGridConfig, newTreeConfig, isFinalStep = false) => {
    const history = this.state.history;
    history.push(newGridConfig);
    console.log(['onStepChange'], newGridConfig, newTreeConfig, isFinalStep, this.state.history);
    if (this.getNextStep(isFinalStep) === 0) {
      this.setState({
        step: 0,
        currentGridConfig: defaultTableConfig,
        history: [],
        currentTree: {}
      })
    } else {
      this.setState({
        step: this.getNextStep(isFinalStep),
        history,
        currentGridConfig: newGridConfig,
        currentTree: newTreeConfig
      })
    }
  };

  onGridChange = (newValues) => {
    console.log(['onGridChange'], newValues);
    this.setState({
      currentGridConfig: Object.assign({}, this.state.currentGridConfig, { values: newValues })
    });
  };

  getStepView() {
    console.log(['getStepView'], this.state.step);
    if (this.state.step === 'final')  {
      return (
        <FinalView {...this.getFinalViewProps()} />
      );
    } else if (this.state.step === 0) {
      return (
        <IntroView {...this.getIntroViewProps()} onGridChange={ this.onGridChange }/>
      );
    } else {
      return (
        <StepView {...this.getStepViewProps()} />
      );
    }
  }

  render() {
    return (
      <div style={{margin: 10}}>
        <Row style={{ marginLeft: 15 }}>
          <h1 style={{fontWeight: 800}}>upgma-demo</h1>
          <h5>Unweighted Pair-Group Method with Arithmetic mean</h5>
        </Row>
        <Row style={{margin: 30}}>
        {
          this.getStepView()
        }
        </Row>
      </div>
    )
  }
}

export default App;
