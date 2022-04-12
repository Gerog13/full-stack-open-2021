import React, { useState, useEffect } from "react";
import personService from "./services/index";
import Filter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const Notification = ({ message }) => {
  if (message === null) return null;
  const styles = {
    border:
      message.type === "success" ? "2px solid #A1E5AB" : "2px solid #D1495B",
    background: "#e6e6e6",
    padding: "12px",
    height: "1.2rem",
    borderRadius: "6px",
    fontSize: "1.2rem",
    margin: "10px 0",
    color: message.type === "success" ? "#065143" : "#7A2B35",
    fontWeight: "900",
  };
  return <div style={styles}>{message.content}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

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
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : updatedPerson))
            );
            setMessage({
              content: `Updated ${person.name} successfully!`,
              type: "success",
            });
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setMessage({
              content: `Information of ${person.name} has already beeen removed from server.`,
              type: "error",
            });
            setTimeout(() => {
              setMessage(null);
            }, 3000);
            setPersons(persons.filter(p => p.id !== person.id))
          });
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

    setMessage({
      content: `Add ${newName} successfully!`,
      type: "success",
    });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
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
      <Notification message={message} />
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
