import { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';
import type { Schedule, Term } from '../types/schedule';

type TermPageProps = {
  schedule: Schedule;
  selectedCourseIds: string[];
  onToggleCourse: (courseId: string) => void;
  onOpenCoursePlan: () => void;
};

const TermPage = ({ schedule, selectedCourseIds, onToggleCourse, onOpenCoursePlan }: TermPageProps) => {
  const [selectedTerm, setSelectedTerm] = useState<Term>('Fall');

  return (
    <section className="flex flex-col gap-8">
      <TermSelector
        selectedTerm={selectedTerm}
        onSelectTerm={setSelectedTerm}
        onOpenCoursePlan={onOpenCoursePlan}
        selectedCount={selectedCourseIds.length}
      />
      <CourseList
        courses={schedule.courses}
        term={selectedTerm}
        selectedCourseIds={selectedCourseIds}
        onToggleCourse={onToggleCourse}
      />
    </section>
  );
};

export default TermPage;
