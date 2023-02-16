import React from 'react';
import { useState, useContext } from 'react';
import { FaClock } from 'react-icons/fa';
import { QuizStateContext } from '../App';

const QuizScreen = ({ quizData }) => {
	const { setQuizState, score, setScore, attemptedQuestions, setAttemptedQuestions, correctAnswers, setCorrectAnswers } = useContext(QuizStateContext);
	const [currQuestion, setCurrQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState('');
	
	
	const question = quizData.length > 0 ? quizData[currQuestion].question : '';
	const incorrectAnswers =
		quizData.length > 0 ? quizData[currQuestion].incorrect_answers : [];
	const correctAnswer =
		quizData.length > 0 ? quizData[currQuestion].correct_answer : '';
	const questions = quizData.length > 0 && quizData.length;
	
	const answers = [...incorrectAnswers, correctAnswer];
	console.log(answers)
	// for (let i = answers.length - 1; i > 0; i--) {
	// 	const j = Math.floor(Math.random() * (i + 1));
	// 	[answers[i], answers[j]] = [answers[j], answers[i]];
	// }
	


	function handleAnswerSelected(e) {
		setSelectedAnswer(e.target.innerText);
		console.log(selectedAnswer === correctAnswer ? true : false);
		setAttemptedQuestions(attemptedQuestions + 1);
	}


	// Get Background Color
	function getBackgroundColor(option) {
		if (selectedAnswer === '') {
			return '';
		} else if (selectedAnswer === option) {
			return option === correctAnswer ? '#89E289' : '#F29EBF';
		} else if (option === correctAnswer) {
			return '#89E289';
		} else {
			return '';
		}
	}


	function handleNextQuestion() {
		setCurrQuestion(currQuestion + 1);
		selectedAnswer === correctAnswer ? setScore(score + 10) : setScore(score);
		selectedAnswer === correctAnswer
			? setCorrectAnswers(correctAnswers + 1)
			: setCorrectAnswers(correctAnswers);
		setSelectedAnswer('');
	}

	function handleFinishQuiz() {
		selectedAnswer === correctAnswer ? setScore(score + 10) : setScore(score);
		setQuizState('finished');
	}


  return (
		<div className='quiz-screen quiz-body flex'>
			<div className='header flex2'>
				<p>
					{currQuestion + 1} / {questions}
				</p>
				<span className='clock flex2'>
					<FaClock /> 15
				</span>
				<div className='time'></div>
			</div>
			<p>
				{question}
			</p>
			<ul className='quiz-answers'>
				{answers.map((option, index) => (
					<li
						key={index}
						className='quiz-answer'
						onClick={handleAnswerSelected}
						style={{ backgroundColor: getBackgroundColor(option) }}
					>
						{option}
					</li>
				))}
			</ul>
			{currQuestion === questions - 1 ? (
				<button className='btn next' onClick={handleFinishQuiz}>
					Finish Quiz
				</button>
			) : (
				<button className='btn next' onClick={handleNextQuestion}>
					Next
				</button>
			)}
		</div>
	); 
}

export default QuizScreen