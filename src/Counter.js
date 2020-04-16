import React, { useState } from 'react';
import './style/Counter.css';

function Button(props) {
    const handleClick = () => props.onClickFunction(props.increment);

	return (
        <button onClick={handleClick}>
            +{props.increment}
        </button>
  );
}

function Display(props) {
    return (
  	    <p>= {props.message}</p>
    );
}

export default function Counter() {
    const [counter, setCounter] = useState(0);
    const incrementCounter = (incrementValue) => setCounter(counter + incrementValue);

	return (
        <div className="counter-component-container">
            <Button onClickFunction={incrementCounter} increment={1} />
            <Button onClickFunction={incrementCounter} increment={5} />
            <Button onClickFunction={incrementCounter} increment={10} />
            <Button onClickFunction={incrementCounter} increment={100} />
            <Display message={counter} />
        </div>
  );
}
