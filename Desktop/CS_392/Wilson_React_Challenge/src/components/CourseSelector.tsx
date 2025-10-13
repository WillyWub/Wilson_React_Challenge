import type { Courses } from '../types/schedule';

type CourseSelectorProps = {
  courses: Courses;
  selectedCourseIds: string[];
  onToggleCourse: (courseId: string) => void;
};

const CourseSelector = ({ courses, selectedCourseIds, onToggleCourse }: CourseSelectorProps) => {
  if (selectedCourseIds.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">No classes selected yet</h2>
        <p className="mt-2 text-sm text-slate-600">
          Choose a course from the list above to add it to your schedule.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Selected classes</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {selectedCourseIds.map((id) => {
          const course = courses[id];
          if (!course) {
            return null;
          }

          return (
            <button
              key={id}
              type="button"
              className="group inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 transition hover:border-blue-400 hover:bg-blue-100"
              onClick={() => onToggleCourse(id)}
            >
              <span className="font-semibold">CS {course.number}</span>
              <span className="text-blue-700">{course.term}</span>
              <span className="text-slate-600 group-hover:text-slate-800">{course.meets}</span>
              <span className="text-xs uppercase tracking-wide text-blue-600">Remove</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CourseSelector;
