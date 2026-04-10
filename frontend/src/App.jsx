import { AppProviders } from "./app/AppProviders";
import { ProtectedView } from "./app/ProtectedView";

function App() {
  return (
    <AppProviders>
      <ProtectedView />
    </AppProviders>
  );
}

export default App;
