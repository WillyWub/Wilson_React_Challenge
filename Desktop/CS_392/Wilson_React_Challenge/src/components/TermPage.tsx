import { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';
import type { Schedule, Term } from '../types/schedule';

type TermPageProps = {
  schedule: Schedule;
};

const TermPage = ({ schedule }: TermPageProps) => {
  const [selectedTerm, setSelectedTerm] = useState<Term>('Fall');

  return (
    <section className="flex flex-col gap-8">
      <TermSelector selectedTerm={selectedTerm} onSelectTerm={setSelectedTerm} />
      <CourseList courses={schedule.courses} term={selectedTerm} />
    </section>
  );
};

export default TermPage;
