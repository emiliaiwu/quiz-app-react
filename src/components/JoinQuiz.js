import React from 'react';
import { useContext } from 'react';
import { QuizStateContext } from '../App';

const JoinQuiz = () => {
	const { setQuizState } = useContext(QuizStateContext);
	function startQuiz() {
		setQuizState("playing")
	}
  return (
		<div className='start-quiz quiz-body flex'>
			<h1>Join Quiz</h1>
			<p>You have 60 secs to answer <br/> these questions</p>
			<button className='start-btn btn' onClick={startQuiz}>Start Quiz</button>
		</div>
	);
}

export default JoinQuiz