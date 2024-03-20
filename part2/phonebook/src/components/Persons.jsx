const Person = ({ name, number, onClick }) => {
  return (
    <div>
      {name} {number} <button onClick={onClick}>delete</button>
    </div>
  );
};

const Persons = ({ filteredName, deleteName }) => {
  return (
    <>
      {filteredName.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          onClick={() => deleteName(person.id)}
        />
      ))}
    </>
  );
};

export default Persons;
