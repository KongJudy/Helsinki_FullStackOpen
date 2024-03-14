import { useState } from 'react';

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>
      {text} {value}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  const average = () => (good - bad) / total;

  const positive = () => (good / total) * 100 + ' %';

  return (
    <div>
      <Header title='give feedback' />
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Header title='statistics' />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={average()}
        positive={positive()}
      />
    </div>
  );
};

export default App;
