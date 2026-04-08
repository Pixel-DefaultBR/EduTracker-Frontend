import { useState } from "react";
import CadastroAlunoForm from "./components/CadastroAlunoForm";
import ConfiguracaoForm from "./components/ConfiguracaoForm";
import RegistroFaltaForm from "./components/RegistroFaltaForm";
import "./App.css";

const TABS = [
  { id: "registro",     label: "Registrar Falta" },
  { id: "cadastro",     label: "Cadastrar Aluno" },
  { id: "configuracao", label: "Configuração" },
];

export default function App() {
  const [tab, setTab] = useState("registro");
  const [shimmer, setShimmer] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleTabChange(id) {
    if (id === tab) return;
    setShimmer(true);
    setTimeout(() => {
      setTab(id);
      setShimmer(false);
    }, 550);
  }

  return (
    <div className="app-layout">
      <header className="topbar">
        <div className="topbar-brand">
          <i className="fa-solid fa-graduation-cap" />
          <span className="topbar-logo">Edu<span>Tracker</span></span>
        </div>

        <nav className="topbar-nav">
          {TABS.map((t) => (
            <div
              key={t.id}
              className={`nav-item ${tab === t.id ? "active" : ""}`}
              onClick={() => handleTabChange(t.id)}
            >
              {t.label}
            </div>
          ))}
        </nav>
      </header>

      <main className="main-content">
        <div className={shimmer ? "shimmer" : ""} style={{ display: "inline-block", width: "100%" }}>
          {tab === "registro"     && <RegistroFaltaForm key={refreshKey} />}
          {tab === "cadastro"     && <CadastroAlunoForm onAlunoAdicionado={() => setRefreshKey((k) => k + 1)} />}
          {tab === "configuracao" && <ConfiguracaoForm />}
        </div>
      </main>
    </div>
  );
}
