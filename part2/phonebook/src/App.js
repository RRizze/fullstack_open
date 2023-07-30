import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
    })
  }, []);

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const findPerson = (name) => {
    return persons.find(p => p.name === name);
  };

  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const person = findPerson(newName);

    if (!!person) {
      const replaceConfirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

      if (!replaceConfirm) {
        setNewName('');
        setNewNumber('');
        return;
      } else {
        personService
          .replaceNumber(person.id, newPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((p) =>
              p.id !== person.id ? p : returnedPerson));
            setNewName('');
            setNewNumber('');
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const handleSearch = (e) => {
    const name = e.target.value;
    setSearchName(name);
  };

  const handleDelete = (person) => {
    const confirmDelete = window.confirm(`Delete ${person.name} ?`);

    if (!confirmDelete) {
      return;
    }

    personService
      .remove(person.id)
      .then(res => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
  };

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(searchName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchName} handleChange={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addPerson}
        newName={newName}
        handleNewName={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumber={handleNewNumberChange} />
      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        handleDelete={handleDelete} />
    </div>
  );
};

export default App
