import type { Courses, Term } from '../types/schedule';

type CourseListProps = {
  courses: Courses;
  term: Term;
};

const CourseList = ({ courses, term }: CourseListProps) => {
  const visibleCourses = Object.entries(courses).filter(([, course]) => course.term === term);

  if (visibleCourses.length === 0) {
    return (
      <p className="text-slate-600">
        No courses available for the selected term.
      </p>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {visibleCourses.map(([id, c]) => (
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
};

export default CourseList;
