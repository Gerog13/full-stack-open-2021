import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim().length === 0 || phoneNumber.trim().length === 0) {
      alert("Please, add a valid name and phone number");
      return;
    }

    let nameExists =
      persons?.filter((person) => person.name === newName).length > 0;
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, number: phoneNumber, id: Math.random() }]);
    setNewName("");
    setPhoneNumber('');
  };


  const personsToShow = filter.trim().length === 0 ? persons : persons.filter((person) => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}/>
      </div>
      <h3>Add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number: 
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow?.map((person) => (
        <p key={person.number}>{person.name} {person.number}</p>
      ))}
      {/* {persons?.map((person) => (
        <p key={person.number}>{person.name} {person.number}</p>
      ))} */}
    </div>
  );
};

export default App;
