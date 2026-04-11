export function StatusBadge({ label, tone = "safe" }) {
  return <span className={`status-badge status-badge--${tone}`}>{label}</span>;
}
