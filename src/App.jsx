import { useState } from "react";
import CadastroAlunoForm from "./components/CadastroAlunoForm";
import DeletarAlunoForm from "./components/DeletarAlunoForm";
import EditarAlunoForm from "./components/EditarAlunoForm";
import RegistroFaltaForm from "./components/RegistroFaltaForm";
import SkeletonCard from "./components/SkeletonCard";
import "./App.css";

const TABS = [
  { id: "registro", label: "Registrar Falta", icon: "https://cdn.lordicon.com/wloilxuq.json", fields: 3,
    titleJsx: <><span className="title-accent">Registrar</span> <span className="title-white">Falta</span></>,
    subtitle: "Registre a ausência de um aluno" },
  { id: "cadastro", label: "Cadastrar Aluno", icon: "https://cdn.lordicon.com/sbiheqdr.json", fields: 2,
    titleJsx: <><span className="title-accent">Cadastrar</span> <span className="title-white">Aluno</span></>,
    subtitle: "Adicione um novo aluno ao sistema" },
  { id: "editar",   label: "Editar Aluno",    icon: "https://cdn.lordicon.com/wkvmfuoc.json", fields: 2,
    titleJsx: <><span className="title-accent">Editar</span> <span className="title-white">Aluno</span></>,
    subtitle: "Atualize os dados de um aluno" },
  { id: "deletar",  label: "Deletar Aluno",   icon: "https://cdn.lordicon.com/jmkrnisz.json", fields: 1,
    titleJsx: <><span className="title-accent">Deletar</span> <span className="title-white">Aluno</span></>,
    subtitle: "Remova um aluno do sistema" },
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
          <span className="sidebar-brand-name"><span className="brand-accent">Edu</span>Tracker</span>
        </div>

        <div className="sidebar-section-label">Menu</div>

        <nav className="sidebar-nav">
          {TABS.map((t) => (
            <div
              key={t.id}
              className={`nav-item ${(tab === t.id && !loading) || nextTab === t.id ? "active" : ""}`}
              onClick={() => handleTabChange(t.id)}
            >
              <lord-icon
                src={t.icon}
                trigger="hover"
                target=".nav-item"
                colors="primary:#ffffff"
                style={{width: "20px", height: "20px"}}
              ></lord-icon>
              {t.label}
            </div>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">{activeTab?.titleJsx}</h1>
          <p className="page-subtitle">{activeTab?.subtitle}</p>
        </div>

        {loading ? (
          <SkeletonCard fields={skeletonFields} />
        ) : (
          <>
            {tab === "registro" && <RegistroFaltaForm key={refreshKey} />}
            {tab === "cadastro" && <CadastroAlunoForm onAlunoAdicionado={() => setRefreshKey((k) => k + 1)} />}
            {tab === "editar"   && <EditarAlunoForm />}
            {tab === "deletar"  && <DeletarAlunoForm />}
          </>
        )}
      </main>
    </div>
  );
}
