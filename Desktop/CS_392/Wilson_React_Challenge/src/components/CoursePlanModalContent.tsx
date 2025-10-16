import type { Courses } from '../types/schedule';

type CoursePlanModalContentProps = {
  selectedCourseIds: string[];
  courses: Courses;
};

const CoursePlanModalContent = ({ selectedCourseIds, courses }: CoursePlanModalContentProps) => {
  if (selectedCourseIds.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600">
        <p>No courses selected yet.</p>
        <p className="mt-2 text-sm">Choose a course from the list to start building your plan.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {selectedCourseIds.map((id) => {
        const course = courses[id];
        if (!course) return null;

        return (
          <li key={id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm font-semibold uppercase text-blue-700">
              <span>CS {course.number}</span>
              <span>{course.term}</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{course.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{course.meets}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default CoursePlanModalContent;
