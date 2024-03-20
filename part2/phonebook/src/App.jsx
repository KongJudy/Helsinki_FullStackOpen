import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import axios from 'axios';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [findName, setFindName] = useState('');

  const addName = (e) => {
    e.preventDefault();
    // console.log(persons[0].name);
    const personObject = {
      name: newName,
      number: newNumber
    };

    // checks if name given is already in the list
    const person = persons.find((p) => p.name === newName);
    // changes number from existing person
    const changeNumber = (id) => {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedNumber = { ...person, number: newNumber };

        personService.update(id, changedNumber).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
        });
      }
    };
    person
      ? changeNumber(person.id)
      : personService.create(personObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        });

    setNewName('');
    setNewNumber('');
  };

  const deleteName = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          alert(`'${person.name}' was already deleted from server`);
        });
    }
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
      <Persons filteredName={filteredName} deleteName={deleteName} />
    </div>
  );
};

export default App;
