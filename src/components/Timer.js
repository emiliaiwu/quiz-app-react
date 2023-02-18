import { useRef, useEffect } from "react";
import { FaClock } from 'react-icons/fa';
import { flushSync } from "react-dom";


function Timer({currQuestion, totalQuestions}) {
    const progressBar = useRef(null);
  return (
		<div className='header flex2'>
			<p>
				{currQuestion + 1} / {totalQuestions}
			</p>
			<span className='clock flex2'>
				<FaClock /> 10
			</span>
			<div className='progress-bar' ref={progressBar}></div>
		</div>
	);
}

export default Timer