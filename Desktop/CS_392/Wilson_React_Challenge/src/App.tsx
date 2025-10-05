import Banner from './components/Banner';
import CourseList from './components/CourseList';

const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101": {
      "term": "Fall",
      "number": "101",
      "meets": "MWF 11:00-11:50",
      "title": "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110": {
      "term": "Fall",
      "number": "110",
      "meets": "MWF 10:00-10:50",
      "title": "Intro Programming for non-majors"
    },
    "S313": {
      "term": "Spring",
      "number": "313",
      "meets": "TuTh 15:30-16:50",
      "title": "Tangible Interaction Design and Learning"
    },
    "S314": {
      "term": "Spring",
      "number": "314",
      "meets": "TuTh 9:30-10:50",
      "title": "Tech & Human Interaction"
    }
  }
};

const App = () => (
  <div className="min-h-screen bg-slate-100">
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  </div>
);

export default App;
