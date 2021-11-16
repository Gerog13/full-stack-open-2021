import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ value, text }) => {
  return (
    <>
      {text === "Positive" ? (
        <tr>
          <td>
            {text} {value} %
          </td>
        </tr>
      ) : (
        <tr>
          <td>
            {text} {value}
          </td>
        </tr>
      )}
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let allStatistics = good + neutral + bad;
  let average = (good - bad) / allStatistics;
  let positive = (good / allStatistics) * 100;
  return (
    <table>
      <tbody>
        <StatisticLine value={good} text="Good" />
        <StatisticLine value={neutral} text="Neutral" />
        <StatisticLine value={bad} text="Bad" />
        <StatisticLine value={allStatistics} text="All" />
        <StatisticLine value={average} text="Average" />
        <StatisticLine value={positive} text="Positive" />
      </tbody>
    </table>
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
