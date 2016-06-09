import React from 'react';
import StepView from './steps/StepView'
import { defaultTableConfig } from '../config';
import IntroView from './steps/IntroView';
import FinalView from './steps/FinalView';
import { Algorithm } from '../algorithm/Algorithm';
import { Col, PageHeader, Row } from 'react-bootstrap';

class App extends React.Component {
  state = {
    step: 0,
    gridConfig: defaultTableConfig,
    reducedGridConfig: {},
    currentTree: {},
    algorithm: new Algorithm(defaultTableConfig)
  };

  getIntroViewProps() {
    return {
      onStepChange: this.onStepChange,
      gridConfig: this.state.gridConfig
    };
  }

  getFinalViewProps() {
    return {
      history: this.state.algorithm.getHistory(),
      onStepChange: this.onStepChange,
      treeConfig: this.state.currentTree
    };
  }

  getStepViewProps() {
    return {
      onStepChange: this.onStepChange,
      step: this.state.step,
      gridConfig: this.state.gridConfig,
      reducedGridConfig: this.state.reducedGridConfig,
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

  onStepChange = () => {
    if (this.state.step === 'final') {
      return this.setState({
        step: 0,
        gridConfig: defaultTableConfig,
        reducedGridConfig: {},
        currentTree: {}
      })
    }
    const gridConfig = this.state.algorithm.getGridConfByStep(0);
    const reducedGridConfig = this.state.algorithm.getGridConfByStep(this.state.step+1);
    const currentTree = this.state.algorithm.getTreeConfByStep(this.state.step+1);
    const isFinalStep = reducedGridConfig === null;

    if (this.getNextStep(isFinalStep) === 0) {
      this.setState({
        step: 0,
        gridConfig: defaultTableConfig,
        reducedGridConfig: {},
        currentTree: {}
      })
    } else {
      this.setState({
        step: this.getNextStep(isFinalStep),
        reducedGridConfig,
        gridConfig,
        currentTree
      })
    }
  };

  onGridChange = (newValues) => {
    console.log(['onGridChange'], newValues);
    const newGrid = Object.assign({}, this.state.gridConfig, { values: newValues });
    this.setState({
      currentGridConfig: newGrid,
      algorithm: new Algorithm(newGrid)
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
