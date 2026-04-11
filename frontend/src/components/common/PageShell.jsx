export function PageShell({ sidebar, children }) {
  return (
    <div className="page-shell">
      <aside className="page-shell__sidebar">{sidebar}</aside>
      <main className="page-shell__content">{children}</main>
    </div>
  );
}
