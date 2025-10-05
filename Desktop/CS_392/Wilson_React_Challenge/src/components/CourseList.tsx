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

const CourseList = ({ courses }: CourseListProps) => (
  <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
    {Object.entries(courses).map(([id, c]) => (
      <li
        key={id}
        className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-baseline justify-between text-sm font-semibold uppercase text-slate-500">
          <span>{c.term}</span>
          <span>CS {c.number}</span>
        </div>
        <h2 className="text-lg font-semibold leading-snug text-slate-900">
          {c.title}
        </h2>
        <div className="mt-auto text-sm font-medium text-slate-600">{c.meets}</div>
      </li>
    ))}
  </ul>
);

export default CourseList;
