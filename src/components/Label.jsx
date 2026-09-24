import './Label.css';

/** The `▪ SERVICES` eyebrow that opens every band. */
export default function Label({ children, align = 'left', className = '' }) {
  return (
    <p className={`slabel slabel--${align} mono-sm ${className}`.trim()}>
      <span className="slabel__dot" aria-hidden="true" />
      {children}
    </p>
  );
}
