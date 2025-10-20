import { useEffect, useState } from 'react';
import type { Course } from '../types/schedule';

type CourseFormProps = {
  course: Course;
  onCancel: () => void;
};

const CourseForm = ({ course, onCancel }: CourseFormProps) => {
  const [title, setTitle] = useState(course.title);
  const [meets, setMeets] = useState(course.meets);

  useEffect(() => {
    setTitle(course.title);
    setMeets(course.meets);
  }, [course]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="course-title">
          Course title
        </label>
        <input
          id="course-title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Intro to Programming"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="course-meets">
          Meeting times
        </label>
        <input
          id="course-meets"
          name="meets"
          value={meets}
          onChange={(event) => setMeets(event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="MWF 9:00-9:50"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
