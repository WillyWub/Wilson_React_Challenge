import { useEffect, useMemo, useState } from 'react';
import type { Course } from '../types/schedule';
import type { CourseFormData, CourseFormErrors } from '../utilities/courseValidation';
import { validateCourseForm } from '../utilities/courseValidation';

type CourseFormProps = {
  course: Course;
  onCancel: () => void;
};

const CourseForm = ({ course, onCancel }: CourseFormProps) => {
  const [title, setTitle] = useState(course.title);
  const [meets, setMeets] = useState(course.meets);
  const [term, setTerm] = useState<string>(course.term);
  const [number, setNumber] = useState(course.number);

  useEffect(() => {
    setTitle(course.title);
    setMeets(course.meets);
    setTerm(course.term);
    setNumber(course.number);
  }, [course]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const formValues: CourseFormData = {
    title,
    term,
    number,
    meets
  };

  const errors: CourseFormErrors = useMemo(
    () => validateCourseForm(formValues),
    [title, term, number, meets]
  );

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
        {errors.title && <p className="mt-1 text-sm text-rose-600">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="course-term">
          Term
        </label>
        <input
          id="course-term"
          name="term"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Fall"
        />
        {errors.term && <p className="mt-1 text-sm text-rose-600">{errors.term}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="course-number">
          Course number
        </label>
        <input
          id="course-number"
          name="number"
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="213 or 213-2"
        />
        {errors.number && <p className="mt-1 text-sm text-rose-600">{errors.number}</p>}
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
        {errors.meets && <p className="mt-1 text-sm text-rose-600">{errors.meets}</p>}
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
