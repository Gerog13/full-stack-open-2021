import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  let allStatistics = good + neutral + bad;
  let average = (good - bad) / allStatistics;
  let positive = good / allStatistics * 100;
  return (
    <div>
      <h3>Statistics</h3>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {allStatistics}</p>
      <p>Average {isNaN(average) ? '' : average}</p>
      <p>Positive {isNaN(positive) ? '' : `${positive} %`}</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <header>
        <h2>Give Feedback</h2>
      </header>
      <section>
        <Button handleClick={() => setGood(good + 1)} text="Good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      </section>
      {good || neutral || bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

export default App;
