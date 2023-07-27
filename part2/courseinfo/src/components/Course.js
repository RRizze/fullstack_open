const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  );
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts
        ? parts.map(part => 
            <Part
              part={part.name}
              exercises={part.exercises}
              key={part.name.toString()} />)
        : <></>
      }
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, rec) => acc += rec.exercises, 0);
  return (
    <p><b>Total of {total} exercises</b></p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
