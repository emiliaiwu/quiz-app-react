import React from 'react';
import { useState, useContext, useMemo, useRef, useEffect } from 'react';
import { QuizStateContext } from '../App';
import { FaClock } from 'react-icons/fa';



const QuizScreen = ({ quizData }) => {
	const {
		setQuizState,
		score,
		setScore,
		attemptedQuestions,
		setAttemptedQuestions,
		correctAnswers,
		setCorrectAnswers,
	} = useContext(QuizStateContext);
	const progressBar = useRef(null);
	const timerIdRef = useRef(null);
	const timerId = useRef(null);
	const [currQuestion, setCurrQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState('');
	const [clickCount, setClickCount] = useState(1);
	const [seconds, setSeconds] = useState(10);
	

	// Retrieve question, answers, and total number of questions from quiz data
	const question = quizData.length > 0 ? quizData[currQuestion].question : '';
	const totalQuestions = quizData.length;
	const correctAnswer =
		quizData.length > 0 ? quizData[currQuestion].correct_answer : '';

	// Memoize incorrect answers to avoid unnecessary recomputations
	const incorrectAnswers = useMemo(() => {
		return quizData.length > 0 ? quizData[currQuestion].incorrect_answers : [];
	}, [quizData, currQuestion]);

	// Shuffle answers randomly
	const answers = useMemo(() => {
		const shuffledAnswers = [...incorrectAnswers, correctAnswer];
		for (let i = shuffledAnswers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledAnswers[i], shuffledAnswers[j]] = [
				shuffledAnswers[j],
				shuffledAnswers[i],
			];
		}
		return shuffledAnswers;
	}, [correctAnswer, incorrectAnswers]);

	// Handle selected answers and prevent double click
	function handleAnswerClick(e) {
		setClickCount(clickCount + 1);
		if (clickCount === 1) {
			setSelectedAnswer(e.target.textContent);
			setAttemptedQuestions(attemptedQuestions + 1);
		} else {
			setAttemptedQuestions(attemptedQuestions);
		}
		
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

	// Score, set correct answers and click count
	function handleCorrectAnswersAndScore() {
		selectedAnswer === correctAnswer ? setScore(score + 10) : setScore(score);
		selectedAnswer === correctAnswer
			? setCorrectAnswers(correctAnswers + 1)
			: setCorrectAnswers(correctAnswers);
		setClickCount(1);
	}

	// netx question question
	function handleNextQuestion() {
		clearTimeout(timerIdRef.current);
		clearTimeout(timerId.current);
		currQuestion === totalQuestions - 1
			? setCurrQuestion(currQuestion)
			: setCurrQuestion(currQuestion + 1);
		currQuestion === totalQuestions - 1 && setQuizState('finished');
		handleCorrectAnswersAndScore();
		setSelectedAnswer('');
		setSeconds(10);
	}

	// finish quiz function
	function handleFinishQuiz() {
		handleCorrectAnswersAndScore();
		setQuizState('finished');
	}

	// Progress Bar
	useEffect(() => {
		progressBar.current.classList.remove('active');
		const timerId = setTimeout(() => {
			progressBar.current.classList.add('active');
		}, 100);
		return () => clearTimeout(timerId);
		
	}, [currQuestion]);

	// useEffect for seconds countdown
	useEffect(() => {
		timerId.current = setTimeout(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
		}, 1000);
		return () => clearTimeout(timerId.current);
	}, [seconds]);


	// useEffect for next question after 10secs
	useEffect(() => {
		timerIdRef.current = setTimeout(handleNextQuestion, 10 * 1000);
		return () => clearTimeout(timerIdRef.current);
	}, [currQuestion]);



	return (
		<div className='quiz-screen quiz-body flex'>
			<div className='header flex2'>
				<p>
					{currQuestion + 1} / {totalQuestions}
				</p>
				<span className='clock flex2'>
					<FaClock />
					<span className='seconds'>
						{seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
					</span>
				</span>
				<div className='progress-bar' ref={progressBar}></div>
			</div>
			<p>{question}</p>
			<ul className='quiz-answers'>
				{answers.map((option, index) => (
					<li
						key={index}
						className='quiz-answer'
						style={{ backgroundColor: getBackgroundColor(option) }}
						onClick={handleAnswerClick}
					>
						{option}
					</li>
				))}
			</ul>
			{currQuestion === totalQuestions - 1 ? (
				<button className='btn next' onClick={handleFinishQuiz}>
					Finish Quiz
				</button>
			) : (
				<button className='btn next' onClick={handleNextQuestion}>
					Next Question
				</button>
			)}
		</div>
	);
}

export default QuizScreen