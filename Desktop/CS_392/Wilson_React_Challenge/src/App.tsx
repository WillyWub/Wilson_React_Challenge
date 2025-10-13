import { useState } from 'react';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import CourseSelector from './components/CourseSelector';
import { useJsonQuery } from './utilities/fetch';
import type { Schedule } from './types/schedule';

const COURSES_URL = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';

const App = () => {
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [schedule, isLoading, error] = useJsonQuery<Schedule>(COURSES_URL);

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

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <Banner title={schedule.title} />
        <TermPage
          schedule={schedule}
          selectedCourseIds={selectedCourseIds}
          onToggleCourse={handleToggleCourse}
        />
        <CourseSelector
          courses={schedule.courses}
          selectedCourseIds={selectedCourseIds}
          onToggleCourse={handleToggleCourse}
        />
      </div>
    </div>
  );
};

export default App;
