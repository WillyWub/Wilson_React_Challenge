import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { useJsonQuery } from './utilities/fetch';

type Course = {
  term: string;
  number: string;
  meets: string;
  title: string;
};

type Schedule = {
  title: string;
  courses: Record<string, Course>;
};

const COURSES_URL = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';

const App = () => {
  const [schedule, isLoading, error] = useJsonQuery<Schedule>(COURSES_URL);

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
        <CourseList courses={schedule.courses} />
      </div>
    </div>
  );
};

export default App;
