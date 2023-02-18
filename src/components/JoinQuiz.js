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
			<p>You have 10 secs to answer <br/> each question. Let's go!</p>
			<button className='start-btn btn' onClick={startQuiz}>Start Quiz</button>
		</div>
	);
}

export default JoinQuiz