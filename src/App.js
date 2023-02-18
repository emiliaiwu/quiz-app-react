import QuizScreen from "./components/QuizScreen";
import JoinQuiz from "./components/JoinQuiz";
import QuizResult from "./components/QuizResult";
import { useState, useEffect, createContext } from 'react';

export const QuizStateContext = createContext();
function App() {
	const [quizState, setQuizState] = useState('join');
	const [quizData, setQuizData] = useState([]);
	const [attemptedQuestions, setAttemptedQuestions] = useState(0);
	const [score, setScore] = useState(0);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [reLoad, setReLoad] = useState(0)


	// Fetch quiz data from API when component mounts
	useEffect(() => {
		const fetchQuizData = async () => {
			try {
				const response = await fetch(
					'https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple'
				);
				const data = await response.json();
				setQuizData(data.results);
			} catch (error) {
				console.log(error);
			}
		};
		fetchQuizData();
	}, []);

	return (
		<div className='App'>
			<QuizStateContext.Provider
				value={{
					quizState,
					setQuizState,
					score,
					setScore,
					correctAnswers,
					setCorrectAnswers,
					attemptedQuestions,
					setAttemptedQuestions,
					reLoad,
					setReLoad,
				}}
			>
				{quizState === 'join' && <JoinQuiz />}
				{quizState === 'playing' && <QuizScreen quizData={quizData} />}
				{quizState === 'finished' && <QuizResult />}
			</QuizStateContext.Provider>
		</div>
	);
}

export default App;
