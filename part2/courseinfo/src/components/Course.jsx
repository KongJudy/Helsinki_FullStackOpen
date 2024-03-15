import Content from './Content';
import Header from './Header';

const Course = ({ course }) => {
  // console.log(course.parts);
  const total = course.parts.reduce((prev, curr) => prev + curr.exercises, 0);

  // console.log(total);

  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </>
  );
};

export default Course;
