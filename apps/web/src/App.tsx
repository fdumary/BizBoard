import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { PublicCardPage } from "./pages/PublicCardPage";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("bizboard-token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/public/:slug" element={<PublicCardPage />} />
        <Route
          path="/"
          element={(
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
