import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {AuthProvider} from "./context/AuthContext.tsx";
import Dashboard from "./components/Dashboard.tsx";

function App() {


  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>

  )
}

export default App
