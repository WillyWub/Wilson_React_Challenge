export type Term = 'Fall' | 'Winter' | 'Spring';

export type Course = {
  term: Term;
  number: string;
  meets: string;
  title: string;
};

export type Courses = Record<string, Course>;

export type Schedule = {
  title: string;
  courses: Courses;
};
