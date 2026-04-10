import { Button } from "./Button";

export function EmptyState({ title, description, onRetry }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {onRetry ? (
        <Button onClick={onRetry} variant="secondary">
          Try again
        </Button>
      ) : null}
    </div>
  );
}
