import React from 'react'

const Header = (props) => {
    return (
      <h1>
        {props.course.name}
      </h1>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercise}
      </p>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.course.parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises}/>)}
      </div>
    )
  }
  
  const Total = (props) => {
    let totalExercises = props.course.parts.map(part => part.exercises).reduce((acc, next) => acc + next);
  
    return (
      <p>
        Number of exercises {totalExercises}
      </p>
    )
  }
  
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course}/>
        <Content course={props.course}/>
        <Total course={props.course}/>
      </div>
    )
  }

  export default Course