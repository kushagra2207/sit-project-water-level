import { Card } from "../common/Card";

const tips = [
  "Use the latest reading card to verify whether the controller is reporting fresh data.",
  "Watch the history table for sudden drops that may indicate leakage or abnormal discharge.",
  "When the percentage enters the critical range, backend alerts can later be added in the connector layer.",
];

export function QuickTips() {
  return (
    <Card className="tips-card">
      <p className="eyebrow">Operational Notes</p>
      <h3>How this frontend is organized</h3>
      <ul className="tips-list">
        {tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </Card>
  );
}
