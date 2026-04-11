import { Card } from "../common/Card";

const tips = [
  {
    icon: "💡",
    text: "The gauge shows real-time fill level — look for sudden drops that may indicate leakage.",
  },
  {
    icon: "📊",
    text: "The history table updates on refresh — use it to spot trends or abnormal discharge patterns.",
  },
  {
    icon: "⚠️",
    text: "Status badges change color when the water level enters warning or critical ranges.",
  },
];

export function QuickTips() {
  return (
    <Card className="tips-card">
      <p className="eyebrow">Quick Tips</p>
      <h3>What to look for</h3>
      <ul className="tips-list">
        {tips.map((tip) => (
          <li key={tip.text}>
            <span className="tip-icon">{tip.icon}</span> {tip.text}
          </li>
        ))}
      </ul>
    </Card>
  );
}
