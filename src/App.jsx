import { useState } from "react";
import CadastroAlunoForm from "./components/CadastroAlunoForm";
import ConfiguracaoForm from "./components/ConfiguracaoForm";
import RegistroFaltaForm from "./components/RegistroFaltaForm";
import SkeletonCard from "./components/SkeletonCard";
import "./App.css";

const TABS = [
  { id: "registro",     label: "Registrar Falta",  icon: "fa-clipboard-list", fields: 3,
    title: "Registrar Falta",  subtitle: "Registre a ausência de um aluno" },
  { id: "cadastro",     label: "Cadastrar Aluno",   icon: "fa-user-plus",      fields: 2,
    title: "Cadastrar Aluno",  subtitle: "Adicione um novo aluno ao sistema" },
  { id: "configuracao", label: "Configuração",       icon: "fa-gear",           fields: 1,
    title: "Configuração",     subtitle: "Gerencie as configurações do sistema" },
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
    }, 600);
  }

  const activeTab      = TABS.find((t) => t.id === (nextTab ?? tab));
  const skeletonFields = activeTab?.fields ?? 3;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <i className="fa-solid fa-graduation-cap" />
          </div>
          <span className="sidebar-brand-name">EduTracker</span>
        </div>

        <div className="sidebar-section-label">Menu</div>

        <nav className="sidebar-nav">
          {TABS.map((t) => (
            <div
              key={t.id}
              className={`nav-item ${(tab === t.id && !loading) || nextTab === t.id ? "active" : ""}`}
              onClick={() => handleTabChange(t.id)}
            >
              <i className={`fa-solid ${t.icon} nav-icon`} />
              {t.label}
            </div>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">{activeTab?.title}</h1>
          <p className="page-subtitle">{activeTab?.subtitle}</p>
        </div>

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
