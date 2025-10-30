import { useMemo, useState } from 'react';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import CourseSelector from './components/CourseSelector';
import Modal from './components/Modal';
import CoursePlanModalContent from './components/CoursePlanModalContent';
import CourseForm from './components/CourseForm';
import { updateDataAtPath, useAuthState, useDataQuery } from './utilities/firebase';
import type { Course, Courses, Schedule } from './types/schedule';

const COURSES_PATH = import.meta.env.VITE_FIREBASE_SCHEDULE_PATH ?? 'courses';
const FALLBACK_SCHEDULE_TITLE =
  import.meta.env.VITE_FALLBACK_SCHEDULE_TITLE ?? 'Course Schedule';

type ScheduleDataShape = 'schedule' | 'coursesOnly';

const isCourse = (value: unknown): value is Course => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const course = value as Partial<Course>;
  return (
    typeof course.term === 'string' &&
    typeof course.number === 'string' &&
    typeof course.meets === 'string' &&
    typeof course.title === 'string'
  );
};

const isCoursesRecord = (value: unknown): value is Courses => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  return Object.values(value as Record<string, unknown>).every(isCourse);
};

const isSchedule = (value: unknown): value is Schedule => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const schedule = value as Partial<Schedule>;
  return (
    typeof schedule.title === 'string' &&
    Boolean(schedule.courses) &&
    typeof schedule.courses === 'object'
  );
};

const parseScheduleData = (
  data: Schedule | Courses | null | undefined
): { schedule: Schedule | null; shape: ScheduleDataShape | null } => {
  if (isSchedule(data)) {
    return { schedule: data, shape: 'schedule' };
  }

  if (isCoursesRecord(data)) {
    return {
      schedule: {
        title: FALLBACK_SCHEDULE_TITLE,
        courses: data,
      },
      shape: 'coursesOnly',
    };
  }

  return { schedule: null, shape: null };
};

const App = () => {
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [isCoursePlanOpen, setIsCoursePlanOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [data, isLoading, error] = useDataQuery<Schedule | Courses | null>(COURSES_PATH);
  const { isAuthenticated } = useAuthState();
  const { schedule, shape } = useMemo(() => parseScheduleData(data), [data]);

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourseIds((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  if (error) {
    return <h1>Error loading course data: {`${error}`}</h1>;
  }

  if (isLoading) {
    return <h1>Loading course data...</h1>;
  }

  if (!schedule) {
    return <h1>No course data found</h1>;
  }

  const editingCourse = editingCourseId ? schedule.courses[editingCourseId] : null;

  const buildCoursePath = (courseId: string) =>
    shape === 'schedule'
      ? `${COURSES_PATH}/courses/${courseId}`
      : `${COURSES_PATH}/${courseId}`;

  const handleSaveCourse = async (
    courseId: string,
    originalCourse: Course,
    updatedCourse: Course
  ) => {
    if (!shape) {
      throw new Error('Cannot save course: schedule data is unavailable.');
    }
    if (!isAuthenticated) {
      return;
    }

    const changedFields: Partial<Course> = {};
    if (originalCourse.title !== updatedCourse.title) {
      changedFields.title = updatedCourse.title;
    }
    if (originalCourse.term !== updatedCourse.term) {
      changedFields.term = updatedCourse.term;
    }
    if (originalCourse.number !== updatedCourse.number) {
      changedFields.number = updatedCourse.number;
    }
    if (originalCourse.meets !== updatedCourse.meets) {
      changedFields.meets = updatedCourse.meets;
    }

    if (Object.keys(changedFields).length === 0) {
      return;
    }

    await updateDataAtPath<Course>(buildCoursePath(courseId), changedFields);
    setEditingCourseId(null);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <Banner title={schedule.title} />
        <TermPage
          schedule={schedule}
          selectedCourseIds={selectedCourseIds}
          onToggleCourse={handleToggleCourse}
          onOpenCoursePlan={() => setIsCoursePlanOpen(true)}
          onEditCourse={(courseId) => {
            if (!isAuthenticated) {
              return;
            }
            setEditingCourseId(courseId);
          }}
          canEdit={isAuthenticated}
        />
        <CourseSelector
          courses={schedule.courses}
          selectedCourseIds={selectedCourseIds}
          onToggleCourse={handleToggleCourse}
        />
      </div>

      <Modal
        title="Course plan"
        isOpen={isCoursePlanOpen}
        onClose={() => setIsCoursePlanOpen(false)}
      >
        <CoursePlanModalContent
          selectedCourseIds={selectedCourseIds}
          courses={schedule.courses}
        />
      </Modal>

      <Modal
        title={editingCourse ? `Edit CS ${editingCourse.number}` : 'Edit course'}
        isOpen={Boolean(editingCourse)}
        onClose={() => setEditingCourseId(null)}
      >
        {editingCourse && editingCourseId && isAuthenticated && (
          <CourseForm
            course={editingCourse}
            onCancel={() => setEditingCourseId(null)}
            onSubmit={(updatedCourse) =>
              handleSaveCourse(editingCourseId, editingCourse, updatedCourse)
            }
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
