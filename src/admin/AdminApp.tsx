import { Navigate, Route, Routes } from "react-router-dom";
import { isAdminSession } from "../store/repo";
import { AdminLayout } from "./AdminLayout";
import { AdminLogin } from "./Login";
import { AdminDashboard } from "./Dashboard";
import { CatalogList } from "./CatalogList";
import { CatalogEditor } from "./CatalogEditor";
import { PublicationsPage } from "./Publications";
import { MediaPage } from "./MediaPage";
import { LeadsPage } from "./Leads";
import { ContentPage } from "./Content";
import { ReportsPage } from "./Reports";
import { SettingsPage } from "./Settings";

function RequireAuth() {
  if (!isAdminSession()) return <Navigate to="/admin/login" replace />;
  return <AdminLayout />;
}

export function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<RequireAuth />}>
        <Route index element={<AdminDashboard />} />
        <Route path="catalogo" element={<CatalogList />} />
        <Route path="catalogo/:id" element={<CatalogEditor />} />
        <Route path="publicaciones" element={<PublicationsPage />} />
        <Route path="medios" element={<MediaPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="contenido" element={<ContentPage />} />
        <Route path="reportes" element={<ReportsPage />} />
        <Route path="ajustes" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
