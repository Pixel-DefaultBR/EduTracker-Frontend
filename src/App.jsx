import { useState } from "react";
import CadastroAlunoForm from "./components/CadastroAlunoForm";
import ConfiguracaoForm from "./components/ConfiguracaoForm";
import RegistroFaltaForm from "./components/RegistroFaltaForm";
import "./App.css";

const TABS = [
  { id: "registro",     label: "Registrar Falta",  icon: "fa-solid fa-pen-to-square" },
  { id: "cadastro",     label: "Cadastrar Aluno",   icon: "fa-solid fa-user-plus" },
  { id: "configuracao", label: "Configuração",       icon: "fa-solid fa-gear" },
];

export default function App() {
  const [tab, setTab] = useState("registro");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="app-layout">
      {/* Topbar */}
      <header className="topbar">
        <i className="fa-solid fa-graduation-cap" style={{ color: "var(--accent)", fontSize: 18 }} />
        <span className="topbar-logo">Edu<span>Tracker</span></span>
      </header>

      {/* Sidebar */}
      <nav className="sidebar">
        {TABS.map((t) => (
          <div
            key={t.id}
            className={`sidebar-item ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <i className={t.icon} />
            {t.label}
          </div>
        ))}
      </nav>

      {/* Content */}
      <main className="main-content">
        {tab === "registro"     && <RegistroFaltaForm key={refreshKey} />}
        {tab === "cadastro"     && <CadastroAlunoForm onAlunoAdicionado={() => setRefreshKey((k) => k + 1)} />}
        {tab === "configuracao" && <ConfiguracaoForm />}
      </main>
    </div>
  );
}
