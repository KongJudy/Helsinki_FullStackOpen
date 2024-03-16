import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import { useState } from 'react';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [findName, setFindName] = useState('');

  const addName = (e) => {
    e.preventDefault();
    // console.log(persons[0].name);

    // checks if name given is already in the list
    const duplicateName = persons.find((name) => name.name === newName);

    duplicateName
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, { name: newName, number: newNumber }]);

    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFindChange = (e) => {
    setFindName(e.target.value);
  };

  const filteredName = persons.filter((person) =>
    person.name.toLowerCase().includes(findName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={findName} onChange={handleFindChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredName={filteredName} />
    </div>
  );
};

export default App;
