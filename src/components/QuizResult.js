import React from 'react';
import { useContext } from 'react';
import { QuizStateContext } from '../App';
import StarRating from './StarRating';


const QuizResult = () => {
  const {
		setQuizState,
		score,
		setScore,
		attemptedQuestions,
		setAttemptedQuestions,
    	correctAnswers,
	  	setCorrectAnswers,
		reLoad,
		setReLoad,
	} = useContext(QuizStateContext);
  
  function playAgain() {
    setQuizState("playing");
	  setScore(0);
	  setAttemptedQuestions(0);
	  setCorrectAnswers(0);
	  setReLoad(reLoad + 1)
  }

  return (
		<div className='quiz-body flex quiz-result'>
			<div className='star-rating flex2'>
				<StarRating />
			</div>
			<h1>{score <= 40 ? 'Try Again!' : 'Congrats!'}</h1>
			<h2>{score}% Score</h2>
			<p>
				You attempted {attemptedQuestions}{' '}
				{attemptedQuestions > 1 ? 'questions' : 'question'} <br /> and{' '}
        {correctAnswers} {correctAnswers > 1 ? 'answers are' : 'answer is '}{' '}
				correct
			</p>
			<button className='btn' onClick={playAgain}>
				Play Again
			</button>
		</div>
	);
}

export default QuizResult