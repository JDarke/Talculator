import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';



let ceRegex = new RegExp(/\d+$|(\d+[\+x\/-])$/);
let opRegex = new RegExp(/[+x\/-]$/);

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        prevValue: '0',
        formula: '',
        sign: '+',
        last: '',
        output: '',
        evald: false
    };
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleSign = this.handleSign.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEval = this.handleEval.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.reset = this.reset.bind(this);

  }
  
  reset() {
    this.setState({
        value: '',
        prevValue: '0',
        formula: '',
        sign: '+',
        last: '',
        output: '',
        evald: false
    });
  }
  
  handleNumbers(e) {
      if (!this.state.evald) {
        this.setState({
          value: this.state.value += e.target.value
          //formula: this.state.formula += e.target.value
        }); 
      } else {
          this.setState({
            value: e.target.value,
            prevValue: '0',
            formula: '',
            sign: '+',
            last: '',
            output: '',
            evald: false
          });
      }
      
      /*this.setState({
          value: '',
          prevValue: '0',
          formula: '',
          sign: '+',
          last: '',
          output: '',
          evald: false
        });*/
  }
  
  handleSign(e) {
    
  }
  
  handleOperator(e) {
     
          var value = this.state.value += e.target.value;
          if (!this.state.evald) {
            this.setState({
              value: '',
              formula: this.state.formula += value
            });
          } else {
              this.setState({
                value: '',
                formula: this.state.formula += e.target.value,
                evald: false
              });
          }
      
  }
  
  handleEval(e) {
    var value = this.state.value;
    
    if (!this.state.evald) {
      if (this.state.value !== '') {
        this.setState({
           value: '',
           formula: this.state.formula += value
           //output: eval(formula)
        });
      }
      var formula = this.state.formula.replace('x', '*');
      this.setState({
         value: eval(formula),
         evald: true
      });
    }   
  }
  
  handleClear(e) {
    if (e.target.value == "AC") {
      this.reset();
    } else if(e.target.value == "CE") {
      
      this.setState({
        //value: '',
        formula: this.state.formula.replace(ceRegex, '')
      });
      console.log(this.state.formula)
    }
  }
  
  handleDecimal(e) {
    /*check if number alrerady has dec plc, add if not */
  }
  
  render() {
    return (
      <div class="calculator">
        <Display 
          formula={this.state.formula} 
          value={this.state.value} 
        />
        
        <Buttons handleNum={this.handleNumbers}
          handleNum={this.handleNumbers}
          handleSign={this.handleSign}
          handleOp={this.handleOperator}
          handleEval={this.handleEval}
          handleClr={this.handleClear}
          handleDec={this.handleDecimal}/>
      </div>
    );
  }
}

class Value extends React.Component {
  render() {
    return (
      <div class="output">{this.props.value}</div>
    );
  }
}

class FormulaScrn extends React.Component {
  render() {
    return (
      <div class="formula">{this.props.formula}</div>
    );
  }
}


class Display extends React.Component {
  render() {
    return (
      <div class="display">
        <FormulaScrn formula={this.props.formula} />
        <Value value={this.props.value} /> 
      </div>
    );
  }
}

class Buttons extends React.Component {

  render() {
    return (
      <div class="buttons">
        <button value="AC" class="clear" onClick={this.props.handleClr}>AC</button>
        <button value="CE" class="clear" onClick={this.props.handleClr}>CE</button>
        <button value="±" class="operator" onClick={this.props.handleOp}>±</button>
        <button value="/" class="operator" onClick={this.props.handleOp}>/</button>
        <button value="7" class="number" onClick={this.props.handleNum}>7</button>
        <button value="8" class="number" onClick={this.props.handleNum}>8</button>
        <button value="9" class="number" onClick={this.props.handleNum}>9</button>
        <button value="x" class="operator" onClick={this.props.handleOp}>x</button>
        <button value="4" class="number" onClick={this.props.handleNum}>4</button>
        <button value="5" class="number" onClick={this.props.handleNum}>5</button>
        <button value="6" class="number" onClick={this.props.handleNum}>6</button>
        <button value="-" class="operator" onClick={this.props.handleOp}>-</button>
        <button value="1" class="number" onClick={this.props.handleNum}>1</button>
        <button value="2" class="number" onClick={this.props.handleNum}>2</button>
        <button value="3" class="number" onClick={this.props.handleNum}>3</button>
        <button value="+" class="operator" onClick={this.props.handleOp}>+</button>
        <button value="0" class="number wide" onClick={this.props.handleNum}>0</button>
        <button value="." class="number" onClick={this.props.handleDec}>.</button>
        <button value="=" class="operator eval" onClick={this.props.handleEval}>=</button>

      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  document.getElementById('root')
);





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
