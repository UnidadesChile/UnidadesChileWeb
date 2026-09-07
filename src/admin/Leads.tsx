import { useState } from "react";
import { useData } from "../store/DataProvider";
import { newLead } from "../lib/leads";
import type { LeadStatus } from "../store/types";
import { statusTone } from "./ui";

export function LeadsPage() {
  const { leads, saveLead, deleteLead, vehicles } = useData();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="mt-1 text-sm text-white/45">Consultas de tasación, crédito, visita y reserva.</p>
        </div>
      </div>

      <form
        className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-[#121212] p-4 sm:grid-cols-[1fr_1fr_1.4fr_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          void saveLead(newLead({ origen: "admin", nombre, telefono, mensaje: mensaje || "Lead manual" }));
          setNombre("");
          setTelefono("");
          setMensaje("");
        }}
      >
        <input className="field" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input className="field" placeholder="WhatsApp" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input className="field" placeholder="Nota" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        <button type="submit" className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold">
          Registrar
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5 text-[11px] uppercase tracking-wider text-white/40">
            <tr>
              <th className="px-4 py-3 font-medium">Contacto</th>
              <th className="px-4 py-3 font-medium">Origen</th>
              <th className="px-4 py-3 font-medium">Unidad</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {leads
              .slice()
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((l) => {
                const car = vehicles.find((v) => v.id === l.vehicleId);
                return (
                  <tr key={l.id} className="border-t border-white/5">
                    <td className="px-4 py-3">
                      <p className="font-semibold">{l.nombre}</p>
                      <p className="text-xs text-white/40">{l.telefono || l.email || "—"}</p>
                      {l.mensaje && <p className="mt-1 max-w-xs text-xs text-white/45">{l.mensaje}</p>}
                    </td>
                    <td className="px-4 py-3 text-white/60">{l.origen}</td>
                    <td className="px-4 py-3 text-white/60">
                      {car ? `${car.marca} ${car.modelo}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold ${statusTone(l.estado)}`}
                        value={l.estado}
                        onChange={(e) => saveLead({ ...l, estado: e.target.value as LeadStatus })}
                      >
                        <option value="nuevo">nuevo</option>
                        <option value="contactado">contactado</option>
                        <option value="ganado">ganado</option>
                        <option value="perdido">perdido</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="text-xs text-white/30" onClick={() => deleteLead(l.id)}>
                        Borrar
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {!leads.length && <p className="mt-6 text-sm text-white/40">No hay leads todavía.</p>}
    </div>
  );
}
