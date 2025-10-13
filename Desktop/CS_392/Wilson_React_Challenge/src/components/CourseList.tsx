import type { Courses, Term } from '../types/schedule';

type CourseListProps = {
  courses: Courses;
  term: Term;
  selectedCourseIds: string[];
  onToggleCourse: (courseId: string) => void;
};

const CourseList = ({ courses, term, selectedCourseIds, onToggleCourse }: CourseListProps) => {
  const visibleCourses = Object.entries(courses).filter(([, course]) => course.term === term);

  if (visibleCourses.length === 0) {
    return <p className="text-slate-600">No courses available for the selected term.</p>;
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {visibleCourses.map(([id, c]) => {
        const isSelected = selectedCourseIds.includes(id);
        const cardClasses = [
          'flex h-full flex-col gap-3 rounded-2xl border p-6 text-left shadow-sm transition-transform transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
          isSelected
            ? 'border-blue-600 bg-blue-50 shadow-md'
            : 'border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg'
        ].join(' ');

        return (
          <li key={id}>
            <button
              type="button"
              className={cardClasses}
              aria-pressed={isSelected}
              onClick={() => onToggleCourse(id)}
            >
              <div className="flex items-baseline justify-between text-sm font-semibold uppercase">
                <span className={isSelected ? 'text-blue-700' : 'text-slate-500'}>{c.term}</span>
                <span className={isSelected ? 'text-blue-700' : 'text-slate-500'}>CS {c.number}</span>
              </div>
              <h2 className="text-lg font-semibold leading-snug text-slate-900">
                {c.title}
              </h2>
              <div className="mt-auto flex items-center justify-between text-sm font-medium text-slate-600">
                {c.meets}
                {isSelected && <span className="inline-flex items-center gap-1 text-blue-700">✓ Selected</span>}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default CourseList;
