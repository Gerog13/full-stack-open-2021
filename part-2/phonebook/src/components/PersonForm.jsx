import React from "react";

const PersonForm = ({
  handleSubmit,
  newName,
  setNewName,
  phoneNumber,
  setPhoneNumber,
}) => {
  return (
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
  );
};

export default PersonForm;
