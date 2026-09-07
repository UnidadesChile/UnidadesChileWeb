import { Link } from "react-router-dom";
import { useData } from "../store/DataProvider";
import { catalogStats } from "../lib/stats";
import { clp } from "../lib/format";
import { PLACEHOLDER_WHATSAPP } from "../lib/config";
import { BarList, Kpi } from "./ui";

export function AdminDashboard() {
  const { vehicles, leads, publications, settings } = useData();
  const stats = catalogStats(vehicles);
  const nuevos = leads.filter((l) => l.estado === "nuevo").length;
  const posts = publications.filter((p) => p.estado === "publicado").length;
  const waPendiente = settings.whatsapp === PLACEHOLDER_WHATSAPP;

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-white/45">Operación de sucursal · Puerto Montt.</p>

      {waPendiente && (
        <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          El WhatsApp todavía es de prueba. Cámbialo en{" "}
          <Link to="/admin/contenido" className="underline">
            Sitio web
          </Link>{" "}
          antes de atender clientes.
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Unidades publicadas" value={String(stats.publicados)} hint={`${stats.n} en total`} />
        <Kpi label="Valor de vitrina" value={clp(stats.valorInventario)} hint={`Mediana ${clp(stats.precioMediana)}`} />
        <Kpi label="Ahorro vs mercado" value={`${stats.ahorroPromedioPct.toFixed(1)}%`} hint={`Total ${clp(stats.ahorroTotal)}`} />
        <Kpi label="Leads nuevos" value={String(nuevos)} hint={`${leads.length} acumulados · ${posts} notas`} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-[#121212] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Stock por marca</h2>
            <Link to="/admin/reportes" className="text-xs text-brand">
              Ver reportes
            </Link>
          </div>
          <BarList rows={stats.porMarca.map((r) => ({ label: r.marca, n: r.n }))} />
        </section>
        <section className="rounded-2xl border border-white/10 bg-[#121212] p-5">
          <h2 className="mb-4 font-semibold">Para operar hoy</h2>
          <ol className="space-y-2 text-sm text-white/70">
            <li>1. Confirma WhatsApp y horario en Sitio web.</li>
            <li>2. Revisa precios y estados en Catálogo (publicado / reservado / vendido).</li>
            <li>3. Atiende leads nuevos: tasación, crédito y reservas.</li>
            <li>4. Descarga un backup en Ajustes al cierre del día.</li>
          </ol>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/admin/catalogo" className="rounded-full bg-brand px-4 py-2 text-xs font-semibold">
              Ir al catálogo
            </Link>
            <Link to="/admin/leads" className="rounded-full border border-white/15 px-4 py-2 text-xs">
              Ver leads
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
