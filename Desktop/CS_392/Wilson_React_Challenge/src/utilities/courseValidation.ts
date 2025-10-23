import type { Term } from '../types/schedule';
import { isValidMeetingString } from './timeConflicts';

type CourseFormData = {
  title: string;
  term: string;
  number: string;
  meets: string;
};

export type CourseFormErrors = Partial<Record<keyof CourseFormData, string>>;

const VALID_TERMS: Term[] = ['Fall', 'Winter', 'Spring', 'Summer'];

const COURSE_NUMBER_REGEX = /^\d+(?:-\d+)?$/;

export const validateCourseForm = (data: CourseFormData): CourseFormErrors => {
  const errors: CourseFormErrors = {};

  const trimmedTitle = data.title.trim();
  if (trimmedTitle.length < 2) {
    errors.title = 'Title must be at least 2 characters.';
  }

  const normalizedTerm = data.term.trim();
  if (!VALID_TERMS.includes(normalizedTerm as Term)) {
    errors.term = 'Term must be Fall, Winter, Spring, or Summer.';
  }

  const normalizedNumber = data.number.trim();
  if (!COURSE_NUMBER_REGEX.test(normalizedNumber)) {
    errors.number = 'Course number must be digits with an optional section (e.g., 213 or 213-2).';
  }

  const normalizedMeets = data.meets.trim();
  if (normalizedMeets && !isValidMeetingString(normalizedMeets)) {
    errors.meets = 'Meeting time must include valid days and start-end times (e.g., MWF 12:00-13:20).';
  }

  return errors;
};

export type { CourseFormData };
