import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import type { Course } from '../types/schedule';
import type { CourseFormData, CourseFormErrors } from '../utilities/courseValidation';
import { validateCourseForm } from '../utilities/courseValidation';

type CourseFormProps = {
  course: Course;
  onCancel: () => void;
  onSubmit: (updatedCourse: Course) => Promise<void>;
};

const CourseForm = ({ course, onCancel, onSubmit }: CourseFormProps) => {
  const [title, setTitle] = useState(course.title);
  const [meets, setMeets] = useState(course.meets);
  const [term, setTerm] = useState<string>(course.term);
  const [number, setNumber] = useState(course.number);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setTitle(course.title);
    setMeets(course.meets);
    setTerm(course.term);
    setNumber(course.number);
    setIsSubmitting(false);
    setSubmitError(null);
  }, [course.title, course.meets, course.term, course.number]);

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

  const normalizedCourse: Course = useMemo(
    () => ({
      title: title.trim(),
      term: term.trim() as Course['term'],
      number: number.trim(),
      meets: meets.trim()
    }),
    [title, term, number, meets]
  );

  const hasErrors = Object.values(errors).some(Boolean);
  const isDirty = useMemo(
    () =>
      normalizedCourse.title !== course.title ||
      normalizedCourse.term !== course.term ||
      normalizedCourse.number !== course.number ||
      normalizedCourse.meets !== course.meets,
    [normalizedCourse, course]
  );

  const canSubmit = isDirty && !hasErrors && !isSubmitting;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await onSubmit(normalizedCourse);
    } catch (submitErr) {
      if (isMountedRef.current) {
        setSubmitError(
          submitErr instanceof Error ? submitErr.message : 'Unable to save course right now.'
        );
      }
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
    }
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

      {submitError && <p className="text-sm text-rose-600">{submitError}</p>}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={!canSubmit}
        >
          {isSubmitting ? 'Saving...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
