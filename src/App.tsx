import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminGuard } from './admin/AdminGuard'
import { AdminLayout } from './admin/AdminLayout'
import { AdminContentPage } from './admin/pages/AdminContentPage'
import { AdminFaqsPage } from './admin/pages/AdminFaqsPage'
import { AdminInquiriesPage } from './admin/pages/AdminInquiriesPage'
import { AdminJobsPage } from './admin/pages/AdminJobsPage'
import { AdminLoginPage } from './admin/pages/AdminLoginPage'
import { AdminMediaPage } from './admin/pages/AdminMediaPage'
import { AdminOverviewPage } from './admin/pages/AdminOverviewPage'
import { AdminServicesPage } from './admin/pages/AdminServicesPage'
import { AdminSettingsPage } from './admin/pages/AdminSettingsPage'
import { AdminTestimonialsPage } from './admin/pages/AdminTestimonialsPage'
import { SiteShareMeta } from './components/seo/SiteShareMeta'
import { SiteContentProvider } from './context/SiteContentContext'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { AboutPage } from './pages/AboutPage'
import { CareersPage } from './pages/CareersPage'
import { ContactPage } from './pages/ContactPage'
import { HirePage } from './pages/HirePage'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'

function PublicLayout() {
  return (
    <SiteContentProvider>
      <SiteShareMeta />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/hire" element={<HirePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <SiteFooter />
    </SiteContentProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverviewPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="content" element={<AdminContentPage />} />
            <Route path="media" element={<AdminMediaPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="faqs" element={<AdminFaqsPage />} />
            <Route path="jobs" element={<AdminJobsPage />} />
            <Route path="testimonials" element={<AdminTestimonialsPage />} />
            <Route path="inquiries" element={<AdminInquiriesPage />} />
          </Route>
        </Route>
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  )
}
