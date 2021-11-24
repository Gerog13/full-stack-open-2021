import React from "react";

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.length === 0 ? (
        <p>No results found.</p>
      ) : (
        personsToShow?.map((person) => (
          <p key={person.number}>
            {person.name} {person.number}
          </p>
        ))
      )}
    </div>
  );
};

export default Persons;
