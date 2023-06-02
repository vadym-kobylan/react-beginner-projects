import { useState } from 'react';
import './index.scss';

const questions = [
  {
    title: 'React is...?',
    variants: ['library', 'framework', 'application'],
    correct: 0,
  },
  {
    title: 'The component is...',
    variants: ['application', 'part of an application or page', 'what I dont know what is'],
    correct: 1,
  },
  {
    title: 'What is JSX?',
    variants: [
      'This is plain HTML',
      'This is a function',
      'This is the same HTML, but with the ability to execute JS code',
    ],
    correct: 2,
  },
];

function Result({ correct, step, tryAgain }) {
  const resultInPercentage = (correct / step) * 100;
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>{`You guessed the ${correct} answer${correct === 1 ? '' : 's'} from ${step}`}</h2>
      <h2>{`${resultInPercentage.toFixed(1)}%`}</h2>
      <button onClick={tryAgain}>Try Again</button>
    </div>
  );
}

function Game({ step, onVariantClick }) {
  const progress = (step / questions.length) * 100;
  return (
    <>
      <div className="progress">
        <div style={{ width: `${progress}%` }} className="progress__inner"></div>
      </div>
      <h1>{questions[step].title}</h1>
      <ul>
        {questions[step].variants.map((question, index) => (
          <li key={index} onClick={() => onVariantClick(index)}>
            {question}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);

  const tryAgain = () => {
    setStep(0);
    setCorrect(0);
  };

  const onVariantClick = (index) => {
    index === questions[step].correct && setCorrect(correct + 1);
    setStep(step + 1);
  };

  return (
    <div className="App">
      {step < questions.length ? (
        <Game step={step} onVariantClick={onVariantClick} />
      ) : (
        <Result correct={correct} step={step} tryAgain={tryAgain} />
      )}
    </div>
  );
}

export default App;
