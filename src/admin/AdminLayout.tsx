import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Car,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { Logo } from "../components/Logo";
import { setAdminSession } from "../store/repo";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/catalogo", label: "Catálogo", icon: Car },
  { to: "/admin/publicaciones", label: "Publicaciones", icon: FileText },
  { to: "/admin/medios", label: "Medios", icon: ImageIcon },
  { to: "/admin/leads", label: "Leads", icon: MessageSquare },
  { to: "/admin/contenido", label: "Sitio web", icon: SlidersHorizontal },
  { to: "/admin/reportes", label: "Reportes", icon: BarChart3 },
  { to: "/admin/ajustes", label: "Ajustes", icon: Settings },
];

export function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#070707] text-white">
      <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-white/10 bg-[#0c0c0c] lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <Logo />
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
            Panel de gestión
          </p>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium ${
                  isActive ? "bg-brand text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="m-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13px] text-white/45 hover:bg-white/5 hover:text-white"
          onClick={() => {
            setAdminSession(false);
            navigate("/admin/login");
          }}
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070707]/90 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 lg:px-8">
            <p className="text-[13px] text-white/50">Unidades Chile · administración</p>
            <a href="/" className="text-[12px] font-semibold text-white/70 hover:text-white">
              Ver sitio →
            </a>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:hidden">
            {nav.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                    isActive ? "bg-brand" : "bg-white/5 text-white/60"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </header>
        <div className="px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
