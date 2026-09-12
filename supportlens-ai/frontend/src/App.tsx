import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth, getRoleDashboardRoute } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { RoleRoute } from './components/auth/RoleRoute'
import { Layout } from './components/layout/Layout'

import { LoginPage } from './pages/LoginPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AgentDashboardPage } from './pages/agent/AgentDashboardPage'
import { AnalystDashboardPage } from './pages/analyst/AnalystDashboardPage'
import { DashboardPage } from './pages/DashboardPage'
import { AgentPage } from './pages/AgentPage'
import { ConversationsPage } from './pages/ConversationsPage'
import { EvidencePage } from './pages/EvidencePage'
import { IntentsPage } from './pages/IntentsPage'
import { EscalationsPage } from './pages/EscalationsPage'
import { EvaluationPage } from './pages/EvaluationPage'
import { GoldenSetPage } from './pages/GoldenSetPage'
import { FailuresPage } from './pages/FailuresPage'
import { TrustPage } from './pages/TrustPage'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { DecisionsPage } from './pages/DecisionsPage'
import { SettingsPage } from './pages/SettingsPage'

function RoleDashboardRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={getRoleDashboardRoute(user.role)} replace />
}

function NotFound() {
  return (
    <div className="flex h-64 flex-col items-center justify-center text-center">
      <p className="text-6xl font-black text-slate-200 dark:text-slate-800">404</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Page not found</p>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Login Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes Wrapped in App Layout */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      {/* Dynamic Role Landing Redirect */}
                      <Route path="/" element={<RoleDashboardRedirect />} />
                      <Route path="/dashboard" element={<RoleDashboardRedirect />} />

                      {/* Role-Specific Dashboards */}
                      <Route
                        path="/admin/dashboard"
                        element={
                          <RoleRoute allowedRoles={['ADMIN']}>
                            <AdminDashboardPage />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="/agent/dashboard"
                        element={
                          <RoleRoute allowedRoles={['SUPPORT_AGENT', 'ADMIN']}>
                            <AgentDashboardPage />
                          </RoleRoute>
                        }
                      />
                      <Route
                        path="/analyst/dashboard"
                        element={
                          <RoleRoute allowedRoles={['ANALYST', 'ADMIN']}>
                            <AnalystDashboardPage />
                          </RoleRoute>
                        }
                      />

                      {/* General Overview fallback */}
                      <Route path="/overview" element={<DashboardPage />} />

                      {/* Support AI */}
                      <Route path="/agent" element={<AgentPage />} />
                      <Route path="/conversations" element={<ConversationsPage />} />
                      <Route path="/evidence" element={<EvidencePage />} />
                      <Route path="/intents" element={<IntentsPage />} />
                      <Route path="/escalations" element={<EscalationsPage />} />

                      {/* Evaluation */}
                      <Route path="/evaluation" element={<EvaluationPage />} />
                      <Route path="/failures" element={<FailuresPage />} />
                      <Route path="/golden-set" element={<GoldenSetPage />} />

                      {/* System */}
                      <Route path="/trust" element={<TrustPage />} />
                      <Route path="/architecture" element={<ArchitecturePage />} />
                      <Route path="/decisions" element={<DecisionsPage />} />
                      <Route path="/settings" element={<SettingsPage />} />

                      {/* 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

