import React from "react";

const Header = ({ course }) => {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  );
};

const Content = ({
  part1,
  part2,
  part3,
}) => {
  return (
    <div>
      <Part partName={part1.name} exercisesNumber={part1.exercises}/>
      <Part partName={part2.name} exercisesNumber={part2.exercises}/>
      <Part partName={part3.name} exercisesNumber={part3.exercises}/>
    </div>
  );
};

const Total = ({ exercises1, exercises2, exercises3 }) => {
  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

const Part = ({ partName, exercisesNumber}) => {
  return (
    <p>{partName} {exercisesNumber}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  );
};

export default App;
