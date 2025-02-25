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
import { UserProvider } from "./context/UserContext";
import { TransaccionProvider } from "./context/TransaccionContext";
import { PeriodoProvider } from "./context/PeriodoContext";
import { BancoProvider } from "./context/BancoContext";
import { ConciliacionProvider } from "./context/ConciliacionContext";

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <TokenProvider>
            <PeriodoProvider>
              <TransaccionProvider>
                <BancoProvider>
                  <ConciliacionProvider>
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
                            <Route path="/gerente" element={<GerentePage />} />
                          </Route>

                          <Route element={<ProtectedRoute roles={[4]} />}>
                            <Route path="/auditor" element={<AuditorPage />} />
                          </Route>

                          <Route element={<ProtectedRoute roles={[5]} />}>
                            <Route
                              path="/jefe-contador"
                              element={<JefeContadorPage />}
                            />
                          </Route>

                          <Route element={<ProtectedRoute roles={[6]} />}>
                            <Route
                              path="/contador"
                              element={<ContadorPage />}
                            />
                          </Route>
                        </Routes>
                      </RecoverPasswordProvider>
                    </BrowserRouter>
                  </ConciliacionProvider>
                </BancoProvider>
              </TransaccionProvider>
            </PeriodoProvider>
          </TokenProvider>
        </UserProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
