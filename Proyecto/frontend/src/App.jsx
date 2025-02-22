import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RecoverPasswordProvider } from "./context/RecoverPasswordContext";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import OTPInputPage from "./pages/ValidateCodePage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import GerentePage from "./pages/GerentePage";
import AuditorPage from "./pages/AuditorPage";
import JefeContadorPage from "./pages/JefeContadorPage";
import ContadorPage from "./pages/ContadorPage";
import { TokenProvider } from "./context/ConfiguracionTokenContext";

function App() {
  return (
    <>
      <AuthProvider>
        <TokenProvider>
          <BrowserRouter>
            <RecoverPasswordProvider>
              <Routes>
                {/* Rutas públicas */}
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <HomePage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/recoverpassword"
                  element={
                    <PublicRoute>
                      <RecoverPasswordPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/validate-recovery-code"
                  element={
                    <PublicRoute>
                      <OTPInputPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <PublicRoute>
                      <ResetPasswordPage />
                    </PublicRoute>
                  }
                />

                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute roles={[1, 2]} />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>

                <Route element={<ProtectedRoute roles={[3]} />}>
                  <Route path="/teacher" element={<GerentePage />} />
                </Route>

                <Route element={<ProtectedRoute roles={[4]} />}>
                  <Route path="/student" element={<AuditorPage />} />
                </Route>

                <Route element={<ProtectedRoute roles={[5]} />}>
                  <Route path="/student" element={<JefeContadorPage />} />
                </Route>

                <Route element={<ProtectedRoute roles={[6]} />}>
                  <Route path="/student" element={<ContadorPage />} />
                </Route>
              </Routes>
            </RecoverPasswordProvider>
          </BrowserRouter>
        </TokenProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
