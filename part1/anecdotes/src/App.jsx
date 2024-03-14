import { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

const Display = ({ anecdotes, vote }) => (
  <p>
    {anecdotes}
    <br />
    has {vote} votes
  </p>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  // console.log(anecdotes.length);

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const randomGenerator = () => Math.floor(Math.random() * anecdotes.length);
  // console.log(randomGenerator());

  const handleGenerator = () => setSelected(randomGenerator());

  const handleVote = () => {
    const copy = [...vote];
    copy[selected] += 1;
    // console.log(copy);
    setVote(copy);
  };

  const mostVotes = () => {
    const maxVote = Math.max(...vote);
    const highest = vote.findIndex((x) => x === maxVote);
    return highest;
  };

  // console.log(mostVotes());

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Display anecdotes={anecdotes[selected]} vote={vote[selected]} />
      <Button onClick={handleGenerator} text='next anecdote' />
      <Button onClick={handleVote} text='vote' />
      <Header text='Anecdote with most votes' />
      <Display anecdotes={anecdotes[mostVotes()]} vote={vote[mostVotes()]} />
    </div>
  );
};

export default App;
