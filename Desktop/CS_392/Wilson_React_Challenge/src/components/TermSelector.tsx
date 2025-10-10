import type { Term } from '../types/schedule';

const terms: Term[] = ['Fall', 'Winter', 'Spring'];

type TermSelectorProps = {
  selectedTerm: Term;
  onSelectTerm: (term: Term) => void;
};

const TermSelector = ({ selectedTerm, onSelectTerm }: TermSelectorProps) => (
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
);

export default TermSelector;
