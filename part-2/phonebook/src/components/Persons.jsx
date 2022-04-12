import React from "react";
import personService from "../services/index";

const Persons = ({ personsToShow, setPersons, persons }) => {
  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then((returnedPersons) =>
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPersons))
          )
        );
    }
  };
  return (
    <div>
      {personsToShow.length === 0 ? (
        <p>No results found.</p>
      ) : (
        personsToShow?.map((person, index) => (
          <div
            key={`${Math.random()}~${index}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              {person.name} {person.number}
            </p>
            {person.id && (
              <button
                style={{ marginLeft: "8px" }}
                onClick={() => handleDeletePerson(person)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Persons;
