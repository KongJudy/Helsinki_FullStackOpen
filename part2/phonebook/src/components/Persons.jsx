const Person = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  );
};

const Persons = ({ filteredName }) => {
  return (
    <>
      {filteredName.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </>
  );
};

export default Persons;
