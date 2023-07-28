import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const hook = () => {
    axios.get('http://localhost:3001/persons')
      .then((res) => {
        const data = res.data;
        setPersons(data);
      });
  };
  useEffect(hook, []);

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const personExists = (name) => {
    const exists = persons.find(p => p.name === name);
    return !!exists;
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (personExists(newName)) {
      alert(`newName is already added to phonebook`);
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  const handleSearch = (e) => {
    const name = e.target.value;
    setSearchName(name);
  };

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(searchName));

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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App
