import React from 'react';



export default class Buttons extends React.Component {
  
  render() {
    const { handleClr, handleDec, handleNum, handleEval, handleOp, handleSign } = this.props;
    
    return (
      <div className="buttons">
        <button value="AC" className="clear" onMouseDown={handleClr}>AC</button>
        <button value="CE" className="clear" onClick={handleClr}>CE</button>
        <button value="±" className="operator" onClick={handleSign}>±</button>
        <button value="/" className="operator" onClick={handleOp}>/</button>
        <button value="7" className="number" onClick={handleNum}>7</button>
        <button value="8" className="number" onClick={handleNum}>8</button>
        <button value="9" className="number" onClick={handleNum}>9</button>
        <button value="x" className="operator" onClick={handleOp}>x</button>
        <button value="4" className="number" onClick={handleNum}>4</button>
        <button value="5" className="number" onClick={handleNum}>5</button>
        <button value="6" className="number" onClick={handleNum}>6</button>
        <button value="-" className="operator" onClick={handleOp}>-</button>
        <button value="1" className="number" onClick={handleNum}>1</button>
        <button value="2" className="number" onClick={handleNum}>2</button>
        <button value="3" className="number" onClick={handleNum}>3</button>
        <button value="+" className="operator" onClick={handleOp}>+</button>
        <button value="0" className="number wide" onClick={handleNum}>0</button>
        <button value="." className="number" onClick={handleDec}>.</button>
        <button value="=" className="operator eval" onClick={handleEval}>=</button>
      </div>
    );
  }
}
