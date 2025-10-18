import type { Course } from '../types/schedule';

const DAY_CODES = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'] as const;
type DayCode = typeof DAY_CODES[number];

const parseTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

type Meeting = {
  days: DayCode[];
  start: number;
  end: number;
};

const parseMeeting = (meets: string): Meeting | null => {
  if (!meets.trim()) {
    return null;
  }

  const match = meets.match(/^([A-Za-z]+)\s+(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/);
  if (!match) {
    return null;
  }

  const [, dayPart, startTime, endTime] = match;

  const days: DayCode[] = [];
  let pointer = 0;
  const upperCaseDayPart = dayPart;
  while (pointer < upperCaseDayPart.length) {
    const twoChar = upperCaseDayPart.slice(pointer, pointer + 2);
    const oneChar = upperCaseDayPart.slice(pointer, pointer + 1);

    if (DAY_CODES.includes(twoChar as DayCode)) {
      days.push(twoChar as DayCode);
      pointer += 2;
    } else if (DAY_CODES.includes(oneChar as DayCode)) {
      days.push(oneChar as DayCode);
      pointer += 1;
    } else {
      // Unknown day code, bail out.
      return null;
    }
  }

  if (days.length === 0) {
    return null;
  }

  return {
    days,
    start: parseTimeToMinutes(startTime),
    end: parseTimeToMinutes(endTime)
  };
};

const meetingsOverlap = (a: Meeting, b: Meeting): boolean => {
  const shareDay = a.days.some((day) => b.days.includes(day));
  if (!shareDay) {
    return false;
  }

  return a.start < b.end && b.start < a.end;
};

const coursesConflict = (a: Course, b: Course): boolean => {
  if (a.term !== b.term) {
    return false;
  }

  const meetingA = parseMeeting(a.meets);
  const meetingB = parseMeeting(b.meets);

  if (!meetingA || !meetingB) {
    return false;
  }

  return meetingsOverlap(meetingA, meetingB);
};

export const courseConflictsWithSelection = (candidate: Course, selectedCourses: Course[]): boolean =>
  selectedCourses.some((selected) => coursesConflict(candidate, selected));
