import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { getAdminUser, isAdminSession, setAdminSession } from "../store/repo";

export function AdminLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAdminSession()) return <Navigate to="/admin" replace />;

  return (
    <div className="grid min-h-screen place-items-center bg-black px-4">
      <form
        className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#111] p-8"
        onSubmit={async (e) => {
          e.preventDefault();
          const creds = await getAdminUser();
          if (user === creds.user && password === creds.password) {
            setAdminSession(true);
            navigate("/admin", { replace: true });
            return;
          }
          setError("Usuario o contraseña incorrectos.");
        }}
      >
        <Logo />
        <h1 className="mt-6 text-2xl font-bold">Entrar al panel</h1>
        <p className="mt-2 text-sm text-white/50">
          Gestión de catálogo, fotos, publicaciones y reportes.
        </p>
        <label className="mt-6 block text-xs text-white/45">
          Usuario
          <input className="field mt-1.5" value={user} onChange={(e) => setUser(e.target.value)} />
        </label>
        <label className="mt-4 block text-xs text-white/45">
          Contraseña
          <input
            className="field mt-1.5"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="mt-3 text-sm text-brand">{error}</p>}
        <button type="submit" className="mt-6 w-full rounded-full bg-brand py-3 text-sm font-semibold">
          Ingresar
        </button>
      </form>
    </div>
  );
}
