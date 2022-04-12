import React, { useState, useEffect } from "react";
import personService from "./services/index";
import Filter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456", id: 1 },
  //   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  //   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  //   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  // ]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim().length === 0 || phoneNumber.trim().length === 0) {
      alert("Please, add a valid name and phone number");
      return;
    }

    let nameExists =
      persons?.filter((person) => person.name === newName.trim()).length > 0;
    if (nameExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName.trim());
        const newData = { ...person, number: phoneNumber };
        personService
          .updatePhoneNumber(person.id, newData)
          .then((updatedPerson) =>
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : updatedPerson))
            )
          );
        setNewName("");
        setPhoneNumber("");
        return;
      }
    }
    const personObject = {
      name: newName.trim(),
      number: phoneNumber.trim(),
      id: Math.random(),
    };
    personService
      .create(personObject)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));

    // setPersons([
    //   ...persons,
    //   { name: newName, number: phoneNumber, id: Math.random() },
    // ]);
    setNewName("");
    setPhoneNumber("");
  };

  const personsToShow =
    filter.trim().length === 0
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        setPersons={setPersons}
        persons={persons}
      />
    </div>
  );
};

export default App;
