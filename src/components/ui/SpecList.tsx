// Interface
interface SpecItem {
  term: string;
  value: string;
  mono?: boolean;
}

// Interface
interface SpecListProps {
  items: SpecItem[];
  className?: string;
}

// A specification block. Monospace is reserved for real identifiers such as a
// Store product ID, never used as decoration.
function SpecList({ items, className = "" }: SpecListProps) {
  return (
    <dl className={`divide-y divide-rule ${className}`}>
      {items.map((item) => (
        <div key={item.term} className="flex flex-wrap gap-x-6 gap-y-1 py-3">
          <dt className="w-28 shrink-0 text-sm text-muted">{item.term}</dt>
          <dd
            className={`min-w-0 break-words text-sm text-ink ${item.mono ? "font-mono tracking-tight" : ""}`}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default SpecList;
export type { SpecItem };
