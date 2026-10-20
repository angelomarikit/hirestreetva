import { Navigate, Outlet } from 'react-router-dom'
import { useAdminSession } from './useAdminSession'

export function AdminGuard() {
  const { session, loading } = useAdminSession()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-sm text-white/50">
        Checking admin session…
      </div>
    )
  }

  if (!session) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
