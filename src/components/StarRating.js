import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { QuizStateContext } from '../App';

function StarRating() {
const { score } = useContext(QuizStateContext);
  if (score >= 10 && score <= 20) {
    return (
      <>
        <FaStarHalfAlt className='star star-1'/>
        <FaRegStar className='star star-2' />
        <FaRegStar className='star star-3' />
      </>
      );
  } else if (score > 20 && score < 40) {
      return (
          <>
              <FaStar className='star star-1' />
              <FaRegStar className='star star-2' />
              <FaRegStar className='star star-3' />
          </>
      );
  }else if (score >= 40 && score <= 50) {
        return (
            <>
                <FaStar className='star star-1' />
                <FaStarHalfAlt className='star star-1' />
                <FaRegStar className='star star-3' />
            </>
		);
  } else if (score > 50 && score < 70) {
		return (
			<>
				<FaStar className='star star-1' />
				<FaStar className='star star-2' />
				<FaRegStar className='star star-3' />
			</>
		);
	} else if (score >= 70 && score <= 90) {
		return (
			<>
				<FaStar className='star star-1' />
				<FaStar className='star star-2' />
				<FaStarHalfAlt className='star star-1' />
			</>
		);
	} else if (score === 100) {
		return (
			<>
				<FaStar className='star star-1' />
				<FaStar className='star star-2' />
				<FaStar className='star star-2' />
			</>
		);
	} else {
		return (
			<>
				<FaRegStar className='star star-1' />
				<FaRegStar className='star star-2' />
				<FaRegStar className='star star-3' />
			</>
		);
	}
}

export default StarRating;
