type Course = {
    term: string;
    number: string;
    meets: string;
    title: string;
};

type Courses = Record<string, Course>;

type CourseListProps = {
  courses: Courses;
};

const CourseList = ({courses}: CourseListProps) => (
    <ul>
        {Object.entries(courses).map(([id, c]) => (
      <li key={id}>
        <h2>
          {c.term} {c.number}: {c.title}
        </h2>
        <div>{c.meets}</div>
      </li>
    ))}
    </ul>
);

export default CourseList;
