import { Card } from "../common/Card";

export function SummaryCard({ title, value, detail, accent = "water" }) {
  return (
    <Card className={`summary-card summary-card--${accent}`}>
      <p className="summary-card__title">{title}</p>
      <h3>{value}</h3>
      <p className="summary-card__detail">{detail}</p>
    </Card>
  );
}
