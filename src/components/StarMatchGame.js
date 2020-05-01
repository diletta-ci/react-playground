import React, { useState, useEffect } from 'react';
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
        <button
            className="number"
            style={{ backgroundColor: colors[props.state] }}
            onClick={() => props.onClick(props.number, props.state)}
        >
            {props.number}
        </button>
    )
}

const PlayAgain = props => {
    return (
        <div className="game-done">
            <h3 
                className="message"
                style={{color: props.gameStatus === 'lost' ? 'rgb(242, 37, 103)' : 'rgb(22, 177, 141)'}}
            >
                {props.gameStatus === 'lost' ? 'Game over' : 'Well done!'}
            </h3>
            <button onClick={props.onClick}>Play Again</button>
        </div>
    )
}

const Game = props => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
    const [candidateNumbers, setCandidateNumbers] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft > 0 && availableNumbers.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        }
    })

    const candidateAreWrong = utils.sum(candidateNumbers) > stars;
    const gameStatus = availableNumbers.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

    const numberStatus = (number) => {
        if (!availableNumbers.includes(number)) {
            return 'used';
        }

        if (candidateNumbers.includes(number)) {
            return candidateAreWrong ? 'wrong' : 'canditate';
        }

        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        if (gameStatus !== 'active' || currentStatus === 'used') return;

        const newCandidatesNumbers = 
            currentStatus === 'available' ? 
            candidateNumbers.concat(number) :
            candidateNumbers.filter(cn => cn !== number);

        if (utils.sum(newCandidatesNumbers) !== stars) {
            setCandidateNumbers(newCandidatesNumbers);
        } else {
            const newAvailableNumbers = availableNumbers.filter(n => !newCandidatesNumbers.includes(n));

            setStars(utils.randomSumIn(newAvailableNumbers, 9));
            setAvailableNumbers(newAvailableNumbers);
            setCandidateNumbers([]);
        }
    };

	return (
		<div className="star-match-game-app-container">
		<div className="instructions">
			<h3>Pick 1 or more numbers that sum to the number of stars</h3>
		</div>
		<div className="star-game">
            {gameStatus !== 'active' ? (
                <PlayAgain 
                    onClick={props.startNewGame} 
                    gameStatus={gameStatus}
                />
            ) : (
                <Star count={stars} />
            )}

            <div className="numbers-container">
                {utils.range(1, 9).map(number =>
                    <GamePad
                        key={number}
                        state={numberStatus(number)}
                        number={number}
                        onClick={onNumberClick}
                    />
                )}
            </div>
		</div>
		<div className="timer">
			<h3>Time Remaining: {secondsLeft}</h3>
		</div>
		</div>
  	);
};

const StarMatch = () => {
    const [gameId, setGameId] = useState(1);

    return (
        <Game 
            key={gameId}
            startNewGame={() => setGameId(gameId + 1)}
        />
    )
}

// Color Theme
const colors = {
	available: '#a0a0a0',
	used: '#16b18d',
	wrong: '#f22567',
	candidate: '#4fbfd1',
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
