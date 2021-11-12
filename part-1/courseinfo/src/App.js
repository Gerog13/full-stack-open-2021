import React from "react";

const Header = ({ course }) => {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(((part, index) => (
        <Part key={index} partName={part.name} exercisesNumber={part.exercises}/> 
      )))}
    </div>
  );
};

const Total = ({ parts }) => {
  let totalExercises = 0;
  parts?.map((part) => (totalExercises += part.exercises))
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

const Part = ({ partName, exercisesNumber }) => {
  return (
    <p>
      {partName} {exercisesNumber}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
