import type { Courses, Term } from '../types/schedule';
import { courseConflictsWithSelection } from '../utilities/timeConflicts';

type CourseListProps = {
  courses: Courses;
  term: Term;
  selectedCourseIds: string[];
  onToggleCourse: (courseId: string) => void;
};

const CourseList = ({ courses, term, selectedCourseIds, onToggleCourse }: CourseListProps) => {
  const visibleCourses = Object.entries(courses).filter(([, course]) => course.term === term);
  const selectedCourses = selectedCourseIds
    .map((id) => courses[id])
    .filter((course): course is NonNullable<typeof course> => Boolean(course));

  if (visibleCourses.length === 0) {
    return <p className="text-slate-600">No courses available for the selected term.</p>;
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {visibleCourses.map(([id, c]) => {
        const isSelected = selectedCourseIds.includes(id);
        const hasConflict = !isSelected && courseConflictsWithSelection(c, selectedCourses);

        const stateClasses = isSelected
          ? 'border-blue-600 bg-blue-50 shadow-md'
          : hasConflict
            ? 'border-rose-200 bg-rose-50 text-slate-400'
            : 'border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg';

        const termTextClasses = isSelected
          ? 'text-blue-700'
          : hasConflict
            ? 'text-slate-400'
            : 'text-slate-500';

        return (
          <li key={id}>
            <button
              type="button"
              className={[
                'flex h-full w-full flex-col gap-3 rounded-2xl border p-6 text-left shadow-sm transition-transform transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
                stateClasses
              ].join(' ')}
              aria-pressed={isSelected}
              onClick={() => onToggleCourse(id)}
              disabled={hasConflict}
            >
              <div className="flex items-baseline justify-between text-sm font-semibold uppercase">
                <span className={termTextClasses}>{c.term}</span>
                <span className={termTextClasses}>CS {c.number}</span>
              </div>
              <h2 className="text-lg font-semibold leading-snug text-slate-900">
                {c.title}
              </h2>
              <div className="mt-auto flex items-center justify-between text-sm font-medium text-slate-600">
                {c.meets || 'Times TBD'}
                {isSelected && <span className="inline-flex items-center gap-1 text-blue-700">✓ Selected</span>}
                {hasConflict && (
                  <span className="text-sm font-semibold text-rose-500">Conflict</span>
                )}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default CourseList;
