import Person from './Person';

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(p =>
        <Person key={p.id} name={p.name} number={p.number} />
      )}
    </ul>
  );
};

export default Persons;
