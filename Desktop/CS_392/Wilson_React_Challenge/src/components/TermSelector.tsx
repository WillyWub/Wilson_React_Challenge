import type { Term } from '../types/schedule';

const terms: Term[] = ['Fall', 'Winter', 'Spring'];

type TermSelectorProps = {
  selectedTerm: Term;
  onSelectTerm: (term: Term) => void;
  onOpenCoursePlan: () => void;
  selectedCount: number;
};

const TermSelector = ({ selectedTerm, onSelectTerm, onOpenCoursePlan, selectedCount }: TermSelectorProps) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div className="flex flex-wrap items-center gap-3" aria-label="Select term">
      {terms.map((term) => {
        const isActive = term === selectedTerm;
        const classes = [
          'inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          isActive
            ? 'border-blue-600 bg-blue-600 text-white'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
        ].join(' ');

        return (
          <button
            key={term}
            type="button"
            className={classes}
            aria-pressed={isActive}
            onClick={() => onSelectTerm(term)}
          >
            {term}
          </button>
        );
      })}
    </div>

    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      onClick={onOpenCoursePlan}
    >
      Course plan
      <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium">
        {selectedCount}
      </span>
    </button>
  </div>
);

export default TermSelector;
