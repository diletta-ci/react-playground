import React, { useState } from 'react';
import '../style/StarMatchGame.css';

const Star = props => {
    return (
        <div className="stars-container">
            {utils.range(1, props.count).map(starId =>
                <div key={starId} className="star" />
            )}
        </div>
    )
};

const GamePad = props => {
    return (
        <button className="number" onClick={() => console.log('Num', props.number)}>{props.number}</button>
    )
}

const StarMatch = () => {
    const [stars, setStars] = useState(utils.random(1, 9));

	return (
		<div className="star-match-game-app-container">
		<div className="instructions">
			<h3>Pick 1 or more numbers that sum to the number of stars</h3>
		</div>
		<div className="star-game">
			<Star count={stars} />

            <div className="numbers-container">
                {utils.range(1, 9).map(number =>
                    <GamePad key={number} className="number" number={number} />
                )}
            </div>
		</div>
		<div className="timer">
			<h3>Time Remaining: 10</h3>
		</div>
		</div>
  	);
};

// Color Theme
const colors = {
	available: 'lightgray',
	used: 'lightgreen',
	wrong: 'lightcoral',
	candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
	sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

	// create an array of numbers between min and max (edges included)
	range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

	// pick a random number between min and max (edges included)
	random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

	// Given an array of numbers and a max...
	// Pick a random sum (< max) from the set of all available sums in arr
	randomSumIn: (arr, max) => {
	const sets = [[]];
	const sums = [];
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0, len = sets.length; j < len; j++) {
			const candidateSet = sets[j].concat(arr[i]);
			const candidateSum = utils.sum(candidateSet);
			if (candidateSum <= max) {
				sets.push(candidateSet);
				sums.push(candidateSum);
			}
		}
	}
	return sums[utils.random(0, sums.length - 1)];
	},
};

class StarMatchGameApp extends React.Component {
    render() {
        return <StarMatch />;
    }
}

export default StarMatchGameApp;
