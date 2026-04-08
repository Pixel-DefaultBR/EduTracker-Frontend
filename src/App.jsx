import { useState } from "react";
import CadastroAlunoForm from "./components/CadastroAlunoForm";
import ConfiguracaoForm from "./components/ConfiguracaoForm";
import RegistroFaltaForm from "./components/RegistroFaltaForm";
import SkeletonCard from "./components/SkeletonCard";
import "./App.css";

const TABS = [
  { id: "registro",     label: "Registrar Falta",  fields: 3 },
  { id: "cadastro",     label: "Cadastrar Aluno",   fields: 2 },
  { id: "configuracao", label: "Configuração",       fields: 1 },
];

export default function App() {
  const [tab, setTab]         = useState("registro");
  const [loading, setLoading] = useState(false);
  const [nextTab, setNextTab] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleTabChange(id) {
    if (id === tab || loading) return;
    setNextTab(id);
    setLoading(true);
    setTimeout(() => {
      setTab(id);
      setNextTab(null);
      setLoading(false);
    }, 4000);
  }

  const skeletonFields = TABS.find((t) => t.id === (nextTab ?? tab))?.fields ?? 3;

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
              className={`nav-item ${tab === t.id && !loading ? "active" : ""} ${nextTab === t.id ? "active" : ""}`}
              onClick={() => handleTabChange(t.id)}
            >
              {t.label}
            </div>
          ))}
        </nav>
      </header>

      <main className="main-content">
        {loading ? (
          <SkeletonCard fields={skeletonFields} />
        ) : (
          <>
            {tab === "registro"     && <RegistroFaltaForm key={refreshKey} />}
            {tab === "cadastro"     && <CadastroAlunoForm onAlunoAdicionado={() => setRefreshKey((k) => k + 1)} />}
            {tab === "configuracao" && <ConfiguracaoForm />}
          </>
        )}
      </main>
    </div>
  );
}
