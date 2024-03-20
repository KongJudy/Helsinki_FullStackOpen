import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [findName, setFindName] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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

        personService
          .update(id, changedNumber)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            // notification when existing person's number has changed
            setMessage(`Added new number for ${person.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    };
    person
      ? changeNumber(person.id)
      : personService.create(personObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          // notification when person is added
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
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
      <Notification message={message} />
      <ErrorMessage message={errorMessage} />
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
