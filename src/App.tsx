import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Accounts } from "./pages/Accounts";
import { Transactions } from "./pages/Transactions";
import { FinanceProvider } from "./context/FinanceContext";
import "./styles/globals.css";

function App() {
  return (
    <FinanceProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/accounts"
          element={
            <Layout>
              <Accounts />
            </Layout>
          }
        />
        <Route
          path="/transactions"
          element={
            <Layout>
              <Transactions />
            </Layout>
          }
        />
      </Routes>
    </Router>
    </FinanceProvider>
  );
}

export default App;
