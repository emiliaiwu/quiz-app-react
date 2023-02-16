import QuizScreen from "./components/QuizScreen";
import JoinQuiz from "./components/JoinQuiz";
import QuizResult from "./components/QuizResult";
import { useState, useEffect, createContext } from 'react';

export const QuizStateContext = createContext();
function App() {
	const [quizState, setQuizState] = useState('join');
  const [quizData, setQuizData] = useState([]);
	const [apiCalled, setApiCalled] = useState(false);
	const [attemptedQuestions, setAttemptedQuestions] = useState(0);
	const [score, setScore] = useState(0);
	const [correctAnswers, setCorrectAnswers] = useState(0);

	useEffect(() => {
		if (!apiCalled) {
			fetch(
				'https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple'
			)
				.then((response) => response.json())
				.then((data) => {
					setQuizData(data.results);
					setApiCalled(true);
				})
				.catch((error) => console.log(error));
		}
	}, [apiCalled]);

  
  return (
		<div className='App'>
		  <QuizStateContext.Provider value={{
			  quizState,
			  setQuizState,
			  score,
			  setScore,
			  correctAnswers,
			  setCorrectAnswers,
			  attemptedQuestions,
			  setAttemptedQuestions
		  }}>
				{quizState === 'join' && <JoinQuiz />}
				{quizState === 'playing' && <QuizScreen quizData={quizData} />}
				{quizState === 'finished' && <QuizResult />}
			</QuizStateContext.Provider>
		</div>
	);
}

export default App;
