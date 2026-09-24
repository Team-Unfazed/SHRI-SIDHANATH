import './Pill.css';

/**
 * The one button in the system. Everything else is a link.
 *
 * Every instance carries a trailing dot that inverts against the pill, and the
 * label is set in mono, uppercase, at 14px. On hover the pill fills from the
 * dot outwards, which is why the dot sits in its own stacking context.
 */
export default function Pill({
  as,
  children,
  tone = 'lime',
  size = 'md',
  className = '',
  ...rest
}) {
  const Tag = as || (rest.href ? 'a' : 'button');
  return (
    <Tag className={`pill pill--${tone} pill--${size} ${className}`.trim()} {...rest}>
      <span className="pill__label">{children}</span>
      <span className="pill__dot" aria-hidden="true" />
    </Tag>
  );
}
